'use client';

import React, { useState } from 'react';
import { X, HelpCircle, Upload, CheckCircle2, Clock, Image as ImageIcon, Send } from 'lucide-react';
import { Doubt } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';

interface DoubtModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
  courseTitle: string;
  lessonId?: number;
  lessonTitle?: string;
  videoTimestampSeconds?: number;
  onDoubtCreated?: (doubt: Doubt) => void;
}

export const DoubtModal: React.FC<DoubtModalProps> = ({
  isOpen,
  onClose,
  courseId,
  courseTitle,
  lessonId,
  lessonTitle,
  videoTimestampSeconds = 0,
  onDoubtCreated,
}) => {
  const { user } = useAuth();
  const [queryText, setQueryText] = useState('');
  const [timestamp, setTimestamp] = useState(
    videoTimestampSeconds > 0
      ? `${Math.floor(videoTimestampSeconds / 60)}:${(videoTimestampSeconds % 60).toString().padStart(2, '0')}`
      : ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryText.trim() || !user) return;

    setIsSubmitting(true);
    try {
      const newDoubt = await api.createDoubt({
        studentId: user.id,
        studentName: user.fullName,
        courseId,
        courseTitle,
        lessonId,
        lessonTitle,
        queryText: queryText.trim(),
        timestampMinutes: timestamp || undefined,
        screenshotUrl: imageUrl || undefined,
      });

      setIsSuccess(true);
      if (onDoubtCreated) onDoubtCreated(newDoubt);

      setTimeout(() => {
        setIsSuccess(false);
        setQueryText('');
        setImageUrl('');
        onClose();
      }, 1800);
    } catch (error) {
      console.error('Failed to submit doubt:', error);
      alert('Failed to submit doubt. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock screenshot upload
  const handleMockUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a local object URL for preview
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E7E3F5] relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F6F4FF] hover:bg-[#E7E3F5] text-[#6E6990] hover:text-[#17152A] flex items-center justify-center transition-colors"
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center text-center space-y-4 animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-[#E8FAF0] text-[#20D66B] flex items-center justify-center shadow-inner">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-bold text-[#17152A]">Doubt Submitted Successfully!</h3>
            <p className="text-sm text-[#6E6990] max-w-sm">
              Our 10Q Master Faculty will review your query and reply within 2 hours. You will receive an instant notification.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-[#FFE8ED] text-[#FF3F68] flex items-center justify-center font-bold">
                <HelpCircle size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#17152A]">Ask Master Faculty</h3>
                <p className="text-xs text-[#6E6990]">Get 1-on-1 step-by-step resolution</p>
              </div>
            </div>

            {/* Context Badge */}
            <div className="bg-[#F6F4FF] p-3 rounded-xl border border-[#E7E3F5] mb-5 text-xs text-[#3F328A] space-y-1">
              <div className="font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#3F328A]" />
                <span>Course: {courseTitle}</span>
              </div>
              {lessonTitle && (
                <div className="text-[#6E6990] pl-3.5">
                  Lesson: <span className="font-medium text-[#17152A]">{lessonTitle}</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Video Timestamp (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-[#17152A] mb-1.5 flex items-center gap-1.5">
                  <Clock size={13} className="text-[#6E6990]" />
                  <span>Video Timestamp (MM:SS)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 14:20"
                  value={timestamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E7E3F5] text-sm focus:outline-none focus:border-[#3F328A] focus:ring-1 focus:ring-[#3F328A]"
                />
              </div>

              {/* Doubt Query */}
              <div>
                <label className="block text-xs font-semibold text-[#17152A] mb-1.5">
                  Describe your doubt in detail <span className="text-[#FF3F68]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explain where you got stuck or paste the formula/equation..."
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E3F5] text-sm focus:outline-none focus:border-[#3F328A] focus:ring-1 focus:ring-[#3F328A] resize-none"
                />
              </div>

              {/* Screenshot Upload Simulation */}
              <div>
                <label className="block text-xs font-semibold text-[#17152A] mb-1.5 flex items-center gap-1.5">
                  <ImageIcon size={13} className="text-[#6E6990]" />
                  <span>Attach Screenshot (Optional)</span>
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-4 py-2 rounded-xl border border-dashed border-[#3F328A]/40 hover:bg-[#F6F4FF] text-xs font-semibold text-[#3F328A] flex items-center gap-2 transition-colors">
                    <Upload size={14} />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleMockUpload}
                    />
                  </label>
                  {imageUrl && (
                    <span className="text-xs text-[#20D66B] font-semibold flex items-center gap-1">
                      <CheckCircle2 size={13} />
                      Attached
                    </span>
                  )}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting || !queryText.trim()}
                  className="w-full py-3.5 rounded-xl bg-[#3F328A] hover:bg-[#2D246B] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Send to Faculty</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
