import Layout from "@/components/layout/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const Terms = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms and Conditions</h1>
            <p className="text-xl text-white/80">
              Please read these terms and conditions carefully before using our services.
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">1. Introduction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  These Terms and Conditions govern all sales, services, and interactions between Famos IT Solutions and
                  her clients. By engaging with our services or purchasing products from Famos IT, you agree to be bound
                  by these Terms.
                </p>
              </CardContent>
            </Card>

            {/* Services Provided */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">2. Services Provided</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Famos IT offers a range of IT solutions including procurement of hardware and software, managed
                  services, technical support, and logistics. The scope and details of each service will be outlined in
                  separate agreements or proposals.
                </p>
              </CardContent>
            </Card>

            {/* Pricing and Payment */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">3. Pricing and Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All prices are provided in advance through quotations or service agreements and are subject to change
                  without prior notice unless otherwise specified. Payment terms will be specified in individual
                  contracts. Late payments may incur interest or service suspension.
                </p>
              </CardContent>
            </Card>

            {/* Quotations and Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">4. Quotations and Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Quotations are valid for 5 days unless otherwise specified. Orders must be confirmed in writing and
                  are subject to availability. Famos IT reserves the right to decline any order at its discretion.
                </p>
              </CardContent>
            </Card>

            {/* Delivery and Logistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">5. Delivery and Logistics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Famos IT will make every reasonable effort to deliver products and services within the agreed
                  timeframe. However, delivery times are estimates and not guaranteed. Delays due to third-party
                  suppliers or factors beyond our control are not the responsibility of Famos IT.
                </p>
              </CardContent>
            </Card>

            {/* Warranty */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">6. Warranty</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All hardware and software sold are covered by the manufacturer's warranty. Famos IT does not provide
                  separate warranties unless explicitly stated in writing. Warranty claims are subject to the terms set
                  by the product manufacturer.
                </p>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">7. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Famos IT is not liable for any indirect, incidental, or consequential damages arising from the use of
                  its products or services. Our total liability shall not exceed the amount paid by the customer for the
                  product or service giving rise to the claim.
                </p>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">8. Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All content, documentation, and tools provided by Famos IT remain the intellectual property of Famos
                  IT unless otherwise agreed in writing. Clients may not reproduce, distribute, or misuse any
                  proprietary materials.
                </p>
              </CardContent>
            </Card>

            {/* Confidentiality */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">9. Confidentiality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Both parties agree to keep all confidential information, including client data and proprietary
                  methods, strictly confidential and not to disclose it to any third party without prior written
                  consent, except as required by law.
                </p>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">10. Governing Law</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  These Terms shall be governed by and construed in accordance with the laws of Nigeria, and any
                  disputes shall be resolved under the exclusive jurisdiction of the courts of Nigeria.
                </p>
              </CardContent>
            </Card>

            <Separator className="my-8" />

            {/* Return and Refund Policy */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center">Return and Refund Policy</h2>

              {/* Eligibility */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">1. Eligibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Returns are accepted for defective or incorrectly delivered hardware and software products. All
                    return requests must be made within 7 business days of receiving the item.
                  </p>
                </CardContent>
              </Card>

              {/* Conditions for Return */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">2. Conditions for Return</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>The product must be in its original condition and packaging.</li>
                    <li>Software must be unopened and unused.</li>
                    <li>Proof of purchase is required.</li>
                    <li>Custom-configured or special-order items are non-returnable unless defective.</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Return Process */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">3. Return Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To initiate a return, contact Famos IT support at 08145319706 or email
                    support@famousitsolutionltd.com with your order number, item details, and reason for
                    return. Once approved, we will provide instructions for return shipping. The customer is responsible
                    for return shipping costs unless the return is due to an error on our part.
                  </p>
                </CardContent>
              </Card>

              {/* Refunds */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">4. Refunds</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Once the returned item is received and inspected, we will notify you of the approval or rejection of
                    your refund. Approved refunds will be processed within 7–10 business days using the original method
                    of payment.
                  </p>
                </CardContent>
              </Card>

              {/* Non-Returnable Services */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">5. Non-Returnable Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Professional services, digital software licenses, and service hours already rendered are
                    non-returnable.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <div className="space-y-2">
                  <p>
                    <strong>Email:</strong> support@famousitsolutionltd.com
                  </p>
                  <p>
                    <strong>Phone:</strong> 0814 531 9706 / 0706 650 0878
                  </p>
                  <p>
                    <strong>Address:</strong> Lagos, Nigeria
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Terms
