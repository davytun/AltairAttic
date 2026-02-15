import { useState, useEffect } from "react";

export const calculateTimeLeft = () => {
  const now = new Date();
  const target = new Date();
  target.setHours(17, 0, 0, 0); // 5:00 PM deadline

  if (now > target) {
    target.setDate(target.getDate() + 1);
  }

  const diff = target.getTime() - now.getTime();
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const format = (num: number) => num.toString().padStart(2, "0");
  return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
};

export const useCountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return timeLeft;
};

export const useViewingCount = () => {
  const [viewingCount, setViewingCount] = useState(0);

  useEffect(() => {
    const updateViewingCount = () => {
      const count = Math.floor(Math.random() * 15) + 8;
      setViewingCount(count);
    };

    updateViewingCount();
    const interval = setInterval(updateViewingCount, 15000 + Math.random() * 15000);

    return () => clearInterval(interval);
  }, []);

  return viewingCount;
};
