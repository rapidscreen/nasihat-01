export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-4">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                When you use our authentication service, we collect:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Your email address</li>
                <li>Your name</li>
                <li>Your profile picture (if provided via LinkedIn)</li>
                <li>Authentication tokens (stored securely)</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use your information to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Provide authentication services</li>
                <li>Maintain your user session</li>
                <li>Improve our service</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Passwords are hashed using bcrypt</li>
                <li>JWT tokens are used for secure authentication</li>
                <li>HTTP-only cookies for token storage</li>
                <li>HTTPS encryption in production</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                We use LinkedIn OAuth for authentication. Please refer to LinkedIn's privacy policy for information about how they handle your data.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy, please contact us at your-email@example.com.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}