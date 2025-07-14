import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'success' | 'info' | 'warning' | 'error';
  actionType?: 'service_contact' | 'blueprint_purchase' | 'premium_activated' | 'premium_pending' | 'payment_received';
  paymentMethod?: 'paypal' | 'eft';
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  unreadCount: number;
  // Enhanced helper methods
  addServiceContactNotification: () => void;
  addBlueprintPurchaseNotification: (type: 'Rich' | 'Wealthy') => void;
  addPremiumActivatedNotification: (paymentMethod?: 'paypal' | 'eft') => void;
  addPremiumPendingNotification: (paymentMethod: 'paypal' | 'eft') => void;
  addPaymentReceivedNotification: (paymentMethod: 'paypal' | 'eft') => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Enhanced notification templates
  const addServiceContactNotification = () => {
    addNotification({
      title: '📞 Service Request Received',
      message: 'Thank you for your interest! We typically respond within 24-48 hours. Our office hours are Monday-Friday, 09:00-17:00 SAST. We will contact you shortly about your service.',
      type: 'info',
      actionType: 'service_contact',
    });
  };

  const addBlueprintPurchaseNotification = (blueprintType: 'Rich' | 'Wealthy') => {
    addNotification({
      title: `🎉 ${blueprintType} Blueprint Purchase Confirmed!`,
      message: `Your ${blueprintType} Blueprint purchase has been processed successfully. You will receive your blueprint via email shortly. Contact us if you have any issues.`,
      type: 'success',
      actionType: 'blueprint_purchase',
    });
  };

  const addPremiumActivatedNotification = (paymentMethod?: 'paypal' | 'eft') => {
    const methodText = paymentMethod ? 
      (paymentMethod === 'paypal' ? 'PayPal' : 'EFT') : '';
    
    addNotification({
      title: '🎉 Premium Activated!',
      message: `Congratulations! Your HEX HUSTLER AI Premium subscription is now active${methodText ? ` via ${methodText}` : ''}. Enjoy unlimited AI conversations, priority responses, and exclusive hustler strategies!`,
      type: 'success',
      actionType: 'premium_activated',
      paymentMethod,
    });
  };

  const addPremiumPendingNotification = (paymentMethod: 'paypal' | 'eft') => {
    const message = paymentMethod === 'eft' 
      ? 'Your EFT payment proof has been submitted. We will verify and activate your premium account within 24 hours. You will receive a confirmation notification once activated.'
      : 'Your PayPal payment is being processed. Premium access will be activated shortly. You will receive a confirmation notification once complete.';

    addNotification({
      title: '⏳ Premium Activation Pending',
      message,
      type: 'info',
      actionType: 'premium_pending',
      paymentMethod,
    });
  };

  const addPaymentReceivedNotification = (paymentMethod: 'paypal' | 'eft') => {
    const methodText = paymentMethod === 'paypal' ? 'PayPal' : 'EFT';
    
    addNotification({
      title: '💰 Payment Received',
      message: `Your ${methodText} payment for HEX HUSTLER AI Premium has been received and verified. Processing activation now...`,
      type: 'success',
      actionType: 'payment_received',
      paymentMethod,
    });
  };

  const contextValue: NotificationContextType = {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    unreadCount,
    addServiceContactNotification,
    addBlueprintPurchaseNotification,
    addPremiumActivatedNotification,
    addPremiumPendingNotification,
    addPaymentReceivedNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};