const API_URL = import.meta.env.PROD ? (import.meta.env.VITE_API_URL || '') : '';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface RequestConfig extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

class ApiService {
  private baseUrl: string;
  private defaultTimeout: number = 30000;
  private defaultRetries: number = 2;
  private defaultRetryDelay: number = 1000;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async fetchWithTimeout(
    url: string,
    config: RequestConfig
  ): Promise<Response> {
    const { timeout = this.defaultTimeout, ...fetchConfig } = config;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchConfig,
        signal: controller.signal,
      });
      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private async executeWithRetry<T>(
    fn: () => Promise<T>,
    retries: number,
    retryDelay: number
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < retries) {
          const isRetryable = this.isRetryableError(error);
          if (isRetryable) {
            await this.sleep(retryDelay * (attempt + 1));
            continue;
          }
        }
        throw error;
      }
    }

    throw lastError;
  }

  private isRetryableError(error: unknown): boolean {
    if (error instanceof Error) {
      if (error.name === 'AbortError') return false;
      if (error.message.includes('fetch')) return true;
      if (error.message.includes('network')) return true;
      if (error.message.includes('timeout')) return true;
    }
    return false;
  }

  private buildUrl(path: string): string {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.baseUrl}${cleanPath}`;
  }

  private getDefaultHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  async request<T>(
    path: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      retries = this.defaultRetries,
      retryDelay = this.defaultRetryDelay,
      headers,
      ...fetchConfig
    } = config;

    const url = this.buildUrl(path);
    const mergedHeaders = {
      ...this.getDefaultHeaders(),
      ...headers,
    };

    try {
      const response = await this.executeWithRetry(
        () => this.fetchWithTimeout(url, {
          ...fetchConfig,
          headers: mergedHeaders,
        }),
        retries,
        retryDelay
      );

      const contentType = response.headers.get('content-type');
      let data: unknown;

      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        const errorData = data as { error?: string; message?: string };
        return {
          success: false,
          error: errorData?.error || errorData?.message || `Request failed with status ${response.status}`,
        };
      }

      if (typeof data === 'object' && data !== null && 'success' in data) {
        return data as ApiResponse<T>;
      }

      return {
        success: true,
        data: data as T,
      };
    } catch (error) {
      const apiError = this.handleError(error);
      return {
        success: false,
        error: apiError.message,
      };
    }
  }

  async get<T>(path: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...config, method: 'GET' });
  }

  async post<T>(
    path: string,
    body?: unknown,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(path, {
      ...config,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(
    path: string,
    body?: unknown,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(path, {
      ...config,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(path: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...config, method: 'DELETE' });
  }

  private handleError(error: unknown): ApiError {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          message: 'Request timed out. Please try again.',
          code: 'TIMEOUT',
        };
      }

      if (error.message.includes('fetch') || error.message.includes('network')) {
        return {
          message: 'Unable to connect to the server. Please check your connection.',
          code: 'NETWORK_ERROR',
        };
      }

      return {
        message: error.message,
        code: 'UNKNOWN',
      };
    }

    return {
      message: 'An unexpected error occurred. Please try again.',
      code: 'UNKNOWN',
    };
  }
}

export const apiService = new ApiService(API_URL);

export interface PlanFromAPI {
  id: number;
  name: string;
  slug: string | null;
  stripe_price_id: string | null;
  stripe_yearly_price_id: string | null;
  price: string;
  monthly_price_usd: string;
  yearly_price_usd: string | null;
  monthly_price_inr: string;
  yearly_price_inr: string | null;
  yearly_price: string | null;
  yearly_discount_percent: number;
  currency: string;
  billing_cycle: string;
  features: string[] | string | null;
  display_features: string[] | string | null;
  description: string | null;
  max_social_accounts: number | null;
  max_team_members: number | null;
  max_scheduled_posts: number | null;
  is_featured: boolean;
  trial_period_days: number | null;
  trial_enabled: boolean;
  skip_trial_discount_enabled: boolean;
  skip_trial_discount_percent: number;
  is_contact_only: boolean;
  sort_order: number;
}

export interface DisplayPlan {
  id: string;
  name: string;
  slug: string | null;
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
  yearlyDiscount: number;
  highlight: boolean;
  badge: string;
  features: string[];
  description: string | null;
  trialDays: number | null;
  trialEnabled: boolean;
  skipTrialDiscountEnabled: boolean;
  skipTrialDiscountPercent: number;
  isContactOnly: boolean;
  stripePriceId: string | null;
  stripeYearlyPriceId: string | null;
  inheritText?: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  teamSize: string;
  useCase: string;
  message: string;
}

export interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface CreateSubscriptionResponse {
  success: boolean;
  clientSecret?: string;
  customerId?: string;
  user_uuid?: string;
  subscriptionId?: string;
  error?: string;
}

export interface ConfirmPaymentResponse {
  success: boolean;
  user_uuid?: string;
  subscriptionId?: number;
  error?: string;
}

export type CreateSubscriptionApiResponse = ApiResponse<CreateSubscriptionResponse> & CreateSubscriptionResponse;
export type ConfirmPaymentApiResponse = ApiResponse<ConfirmPaymentResponse> & ConfirmPaymentResponse;

export const plansApi = {
  getPublicPlans: () => apiService.get<PlanFromAPI[]>('/api/plans/public'),
};

export const contactApi = {
  submitDemoRequest: (data: ContactFormData) => 
    apiService.post<{ message: string }>('/api/contact/demo-request', data),
};

export const paymentApi = {
  createSubscription: (data: {
    customerData: CustomerData;
    priceId: string;
    trial_end?: number;
  }): Promise<CreateSubscriptionApiResponse> => 
    apiService.post<CreateSubscriptionResponse>('/api/payment/create-subscription', data) as Promise<CreateSubscriptionApiResponse>,

  confirmPayment: (data: {
    user_uuid: string;
    subscriptionId: string;
  }): Promise<ConfirmPaymentApiResponse> => 
    apiService.post<ConfirmPaymentResponse>('/api/payment/confirm', data) as Promise<ConfirmPaymentApiResponse>,
};

export function transformPlanFromAPI(plan: PlanFromAPI): DisplayPlan {
  const isINR = plan.currency === 'INR';
  
  const monthlyPrice = isINR
    ? (plan.monthly_price_inr ? parseFloat(plan.monthly_price_inr) : parseFloat(plan.price))
    : (plan.monthly_price_usd ? parseFloat(plan.monthly_price_usd) : parseFloat(plan.price));
  
  const yearlyPrice = isINR
    ? (plan.yearly_price_inr ? parseFloat(plan.yearly_price_inr) : monthlyPrice * 12)
    : (plan.yearly_price_usd ? parseFloat(plan.yearly_price_usd) : plan.yearly_price ? parseFloat(plan.yearly_price) : monthlyPrice * 12);
  
  let parsedDisplayFeatures: string[] = [];
  if (plan.display_features) {
    if (typeof plan.display_features === 'string') {
      try {
        parsedDisplayFeatures = JSON.parse(plan.display_features);
      } catch {
        parsedDisplayFeatures = [];
      }
    } else if (Array.isArray(plan.display_features)) {
      parsedDisplayFeatures = plan.display_features;
    }
  }
  
  let parsedFeatures: string[] = [];
  if (plan.features) {
    if (typeof plan.features === 'string') {
      try {
        parsedFeatures = JSON.parse(plan.features);
      } catch {
        parsedFeatures = [];
      }
    } else if (Array.isArray(plan.features)) {
      parsedFeatures = plan.features;
    }
  }
  
  const features = parsedDisplayFeatures.length > 0 
    ? parsedDisplayFeatures 
    : parsedFeatures;

  let inheritText: string | undefined;
  const lowerName = plan.name.toLowerCase();
  if (lowerName.includes('growth') || lowerName.includes('professional')) {
    inheritText = 'Everything in Starter, PLUS:';
  } else if (lowerName.includes('agency') || lowerName.includes('enterprise') || lowerName.includes('business')) {
    inheritText = 'Everything in Growth, PLUS:';
  }

  return {
    id: plan.stripe_price_id || `plan-${plan.id}`,
    name: plan.name,
    slug: plan.slug,
    monthlyPrice,
    yearlyPrice,
    currency: plan.currency || 'USD',
    yearlyDiscount: plan.yearly_discount_percent || 0,
    highlight: plan.is_featured,
    badge: plan.is_featured ? 'Most popular' : '',
    features,
    description: plan.description,
    trialDays: plan.trial_period_days,
    trialEnabled: plan.trial_enabled,
    skipTrialDiscountEnabled: plan.skip_trial_discount_enabled || false,
    skipTrialDiscountPercent: plan.skip_trial_discount_percent || 0,
    isContactOnly: plan.is_contact_only,
    stripePriceId: plan.stripe_price_id,
    stripeYearlyPriceId: plan.stripe_yearly_price_id,
    inheritText,
  };
}
