
export default function ExchangePolicy() {
  return (
    <section className="bg-gray-100 py-12 px-6 md:px-12 text-gray-800 mt-20">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Intro */}
        <div className="text-center">
          <p className="text-gray-600">
            Thank you for choosing Phajil.com for your online shopping needs. 
            We strive to provide you with a seamless and enjoyable shopping experience.
            To ensure your satisfaction, please review our Exchange Policy below.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white shadow rounded-lg p-6 md:p-8 space-y-6 border-l-4 border-yellow-400">
          
          <h2 className="text-2xl font-bold text-yellow-400 text-center">
            Eligibility for Exchange
          </h2>
          
          <ul className="list-disc list-inside space-y-2">
            <li>Exchanges are accepted within <strong>7 days</strong> from the date of purchase.</li>
            <li>We are only responsible for size changes other than than that we incur additional charges.</li>
            <li>Products must be in their original condition, unused, and with all tags and packaging intact.</li>
          </ul>

          <div>
            <h3 className="font-semibold text-yellow-400">Exchange Procedure:</h3>
            <p className="mt-2">
             To initiate an exchange, please contact our Customer Service team at <a href=" bephajil@gmail.com." className="underline text-red-500">bephajil@gmail.com.</a> 
            </p>
            <p className="mt-1">Provide your order number, the name of the product you wish to exchange, and the reason for the exchange.</p>
            <p className="mt-1">Our Customer Service team will guide you through the exchange process, including providing you with a return authorization and shipping instructions.</p>
          </div>

          <div>
            <h3 className="font-semibold text-yellow-400">Inspection & Approval:</h3>
            <p className="mt-2">
              Upon receiving the returned item, our team will inspect it to ensure it meets the eligibility criteria.
            </p>
            <p className="mt-1">Once approved, we will process the exchange and dispatch the replacement item.</p>
          </div>

          <div>
            <h3 className="font-semibold text-yellow-400">Refund:</h3>
            <p>
              If refund is approved, Refund will be issued to your original payment method within <strong>5-7 days</strong>.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-yellow-400">Return:</h3>
            <p>We have a <strong>14-day</strong> return policy.</p>
          </div>

          <div>
            <h3 className="font-semibold text-yellow-400">Out-of-Stock Refund:</h3>
            <p className="mt-2">
              In the event that the replacement item is out of stock, we will issue a refund for the purchase amount.
            </p>
            <p className="mt-1">Refunds will be processed using the original payment method.</p>
          </div>

          <div>
            <h3 className="font-semibold text-yellow-400">Exceptions:</h3>
            <p>
             Customized or personalized items are not eligible for exchange unless there is a manufacturing defect or an error on our part.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-yellow-400">Contact Information:</h3>
            <p>
             For any inquiries or assistance regarding exchanges, please contact our Customer Service team at  <a href="bephajil@gmail.com." className="underline text-red-500">bephajil@gmail.com.</a>.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-yellow-400">Policy Updates:</h3>
            <p>
              Phajil.com reserves the right to update or modify this Exchange Policy at any time. Please refer to our website for the latest policy information.
            </p>
            <p>
            By shopping at Phajil.com, you agree to abide by this Exchange Policy. We appreciate your trust in us, and we are committed to providing you with the best possible service.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm">
          Thank you for choosing Phajil.com!
        </p>
      </div>
    </section>
  );
}
