import { Separator } from "../ui/separator"

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t dark:border-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-black font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold dark:text-white">Silo</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Evidence-based supplement intelligence for optimal health outcomes.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 dark:text-white">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">
                  Stack Compass
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">
                  Stack Lab
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">
                  Supplement Audit
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">
                  Research Digest
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 dark:text-white">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 dark:text-white">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 dark:bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 Silo. All rights reserved.</p>
          <p>Built for evidence-based supplementation</p>
        </div>
      </div>
    </footer>
  )
}
