# 21 - PayU Payment Gateway Architecture & Security Protocol

## 1. PayU Integration Workflow & Security

```mermaid
sequenceDiagram
    autonumber
    actor Student as Student (Browser)
    participant NextApp as Next.js Frontend
    participant API as ASP.NET Core API
    participant DB as SQL Server
    participant PayU as PayU Payment Gateway

    Student->>NextApp: Click "Enroll / Buy Now"
    NextApp->>API: POST /api/v1/checkout/create-order (Items, Coupon)
    API->>DB: Validate Prices & Create Pending Order
    API->>API: Compute Server-Side SHA-512 PayU Hash (Key|TxnId|Amount|ProductInfo|Name|Email|...|Salt)
    API-->>NextApp: Return PayU Parameters + Hash (SALT NEVER EXPOSED)
    NextApp->>PayU: Submit Form POST to PayU Checkout URL
    Student->>PayU: Complete Card/UPI/NetBanking Payment
    PayU-->>API: Server-to-Server Webhook POST /api/v1/payments/payu/callback
    API->>API: Verify Reverse SHA-512 Hash (Salt|Status|...|Key)
    alt Hash Valid & Status == Success
        API->>DB: Idempotent Check & Update Order Status to Paid
        API->>DB: Insert Course Enrollment Records
        API-->>PayU: 200 OK
    else Hash Invalid or Status == Failure
        API->>DB: Log Failed Transaction & Update Order to Failed
        API-->>PayU: 200 OK
    end
    PayU->>NextApp: Redirect Student to /payment-success or /payment-failure
    NextApp->>API: GET /api/v1/payments/verify/{orderId}
    API-->>NextApp: Return Verified Enrollment Status
    NextApp-->>Student: Display Success Confirmation & Link to Classroom
```

---

## 2. Cryptographic Hash Calculation Specifications

### 2.1 Forward Payment Request Hash (Outbound)
```text
Formula:
SHA512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||salt)
```
- **Strict Rule**: Calculated strictly on backend ASP.NET Core server. Merchant Salt (`PAYU_MERCHANT_SALT`) is NEVER sent to frontend.

### 2.2 Reverse Callback Verification Hash (Inbound)
```text
Formula:
SHA512(salt|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
```
- **Strict Rule**: Verified before any database state transition or enrollment activation.

---

## 3. Idempotency & Edge Case Resilience
1. **Duplicate Webhooks**: Database queries verify if `Order.Status == OrderStatus.Paid`. If already paid, the callback returns 200 OK without re-inserting duplicate enrollments.
2. **Amount Mismatch Detection**: The callback `amount` is strictly compared with `Order.NetAmount`. If mismatched, the transaction is flagged for fraud and rejected.
3. **Network Failure on Return**: Even if the student closes their browser before redirection, the backend server-to-server webhook guarantees enrollment activation.
