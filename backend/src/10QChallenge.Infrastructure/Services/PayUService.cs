using System;
using System.Security.Cryptography;
using System.Text;

namespace _10QChallenge.Infrastructure.Services
{
    public interface IPayUService
    {
        string GenerateForwardHash(string key, string txnId, decimal amount, string productInfo, string firstName, string email, string salt);
        bool VerifyReverseHash(string status, string email, string firstName, string productInfo, decimal amount, string txnId, string key, string salt, string receivedHash);
    }

    public class PayUService : IPayUService
    {
        public string GenerateForwardHash(string key, string txnId, decimal amount, string productInfo, string firstName, string email, string salt)
        {
            // Format: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||salt
            string amountStr = amount.ToString("F2");
            string hashSequence = $"{key}|{txnId}|{amountStr}|{productInfo}|{firstName}|{email}|||||||||||{salt}";
            return ComputeSha512(hashSequence);
        }

        public bool VerifyReverseHash(string status, string email, string firstName, string productInfo, decimal amount, string txnId, string key, string salt, string receivedHash)
        {
            // Format: salt|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
            string amountStr = amount.ToString("F2");
            string hashSequence = $"{salt}|{status}|||||||||||{email}|{firstName}|{productInfo}|{amountStr}|{txnId}|{key}";
            string computedHash = ComputeSha512(hashSequence);
            return string.Equals(computedHash, receivedHash, StringComparison.OrdinalIgnoreCase);
        }

        private static string ComputeSha512(string rawData)
        {
            using (SHA512 sha512 = SHA512.Create())
            {
                byte[] bytes = sha512.ComputeHash(Encoding.UTF8.GetBytes(rawData));
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}
