/**
 * Subscription module for managing customer subscription lifecycles.
 *
 * Handles creation, upgrade, downgrade, cancellation, and renewal
 * of fitness product subscriptions with tier-based pricing.
 */

/** Available subscription tiers with ascending feature sets. */
export enum SubscriptionTier {
  FREE = "free",
  BASIC = "basic",
  PREMIUM = "premium",
  ENTERPRISE = "enterprise",
}

/** A customer subscription record. */
export interface Subscription {
  id: string;
  customerId: string;
  tier: SubscriptionTier;
  startDate: Date;
  endDate: Date | null;
  active: boolean;
  monthlyPrice: number;
}

/** Result of a product-to-customer matching operation. */
export interface MatchResult {
  productId: string;
  score: number;
  reasons: string[];
}

const TIER_PRICES: Record<SubscriptionTier, number> = {
  [SubscriptionTier.FREE]: 0,
  [SubscriptionTier.BASIC]: 19.99,
  [SubscriptionTier.PREMIUM]: 49.99,
  [SubscriptionTier.ENTERPRISE]: 199.99,
};

/** Manages the lifecycle of customer subscriptions. */
export class SubscriptionManager {
  private subscriptions: Map<string, Subscription> = new Map();
  private nextId = 1;

  /**
   * Create a new subscription for a customer.
   * @param customerId - Unique customer identifier.
   * @param tier - Subscription tier to start with.
   * @returns The newly created Subscription.
   */
  create(customerId: string, tier: SubscriptionTier = SubscriptionTier.FREE): Subscription {
    const id = `SUB-${String(this.nextId++).padStart(6, "0")}`;
    const subscription: Subscription = {
      id,
      customerId,
      tier,
      startDate: new Date(),
      endDate: null,
      active: true,
      monthlyPrice: TIER_PRICES[tier],
    };
    this.subscriptions.set(id, subscription);
    return subscription;
  }

  /**
   * Upgrade or downgrade a subscription to a new tier.
   * @param subscriptionId - ID of the subscription to modify.
   * @param newTier - Target tier.
   * @returns The updated Subscription.
   * @throws Error if subscription not found or inactive.
   */
  changeTier(subscriptionId: string, newTier: SubscriptionTier): Subscription {
    const sub = this.subscriptions.get(subscriptionId);
    if (!sub) {
      throw new Error(`Subscription '${subscriptionId}' not found`);
    }
    if (!sub.active) {
      throw new Error(`Subscription '${subscriptionId}' is not active`);
    }
    sub.tier = newTier;
    sub.monthlyPrice = TIER_PRICES[newTier];
    return sub;
  }

  /**
   * Cancel an active subscription.
   * @param subscriptionId - ID of the subscription to cancel.
   * @returns The cancelled Subscription.
   */
  cancel(subscriptionId: string): Subscription {
    const sub = this.subscriptions.get(subscriptionId);
    if (!sub) {
      throw new Error(`Subscription '${subscriptionId}' not found`);
    }
    sub.active = false;
    sub.endDate = new Date();
    return sub;
  }

  /**
   * Get a subscription by its ID.
   * @throws Error if not found.
   */
  get(subscriptionId: string): Subscription {
    const sub = this.subscriptions.get(subscriptionId);
    if (!sub) {
      throw new Error(`Subscription '${subscriptionId}' not found`);
    }
    return sub;
  }

  /** Return total count of active subscriptions. */
  get activeCount(): number {
    return [...this.subscriptions.values()].filter((s) => s.active).length;
  }
}
