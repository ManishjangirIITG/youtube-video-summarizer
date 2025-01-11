import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-[58rem] text-center mb-10">
        <h2 className="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
        <p className="text-muted-foreground">
          Choose the plan that best suits your needs. All plans include a 7-day free trial.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className="flex flex-col p-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="text-muted-foreground">{plan.description}</p>
            </div>
            <div className="mb-4">
              <span className="text-4xl font-bold">${plan.price}</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="mb-4 flex-1 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="w-full">{plan.buttonText}</Button>
          </Card>
        ))}
      </div>
    </div>
  )
}

const plans = [
  {
    name: "Starter",
    description: "Perfect for trying out our service",
    price: "0",
    buttonText: "Start Free Trial",
    features: [
      "5 video summaries per month",
      "Basic AI summarization",
      "720p video support",
      "Email support",
    ],
  },
  {
    name: "Pro",
    description: "For power users who need more",
    price: "29",
    buttonText: "Get Started",
    features: [
      "50 video summaries per month",
      "Advanced AI summarization",
      "4K video support",
      "Priority support",
      "Custom export formats",
    ],
  },
  {
    name: "Enterprise",
    description: "For large teams and organizations",
    price: "99",
    buttonText: "Contact Sales",
    features: [
      "Unlimited video summaries",
      "Premium AI models",
      "8K video support",
      "24/7 priority support",
      "API access",
      "Custom integrations",
    ],
  },
]