## Title
[Payments] Implement Paystack subscription billing

## Labels
`MUS`, `enhancement`, `payments`, `FR-107`

## User Story
As a user, I want to subscribe to Pro or Agency plans, so I can create more projects per month.

## Proposed Solution
1. Create Paystack products and plans via Dashboard or API:
   - Free: ₦0 (1 project/month)
   - Pro: ₦15,000/month (~$29) (10 projects/month)
   - Agency: ₦50,000/month (~$99) (unlimited)
2. Implement `/api/paystack/initialize` - Initialize transaction
3. Implement `/api/paystack/verify` - Verify payment
4. Implement `/api/webhooks/paystack` - Handle subscription events
5. Create `/settings/billing` page with plan display and upgrade buttons
6. Update Subscription model on webhook events
7. Handle subscription renewal, cancellation, and failed payments

## Acceptance Criteria
- [ ] Initialize transaction redirects to Paystack checkout
- [ ] Successful payment creates subscription in database
- [ ] Webhook handles `charge.success` event
- [ ] Webhook handles `subscription.create` event
- [ ] Webhook handles `subscription.disable` event
- [ ] Webhook handles `invoice.payment_failed` event
- [ ] Settings page shows current plan
- [ ] Upgrade/downgrade buttons work correctly
- [ ] Nigerian Naira (NGN) pricing supported
