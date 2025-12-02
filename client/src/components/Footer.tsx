import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <span className="text-2xl font-bold text-blue-600">ShasthoShetu</span>
                        <p className="mt-4 text-gray-500 text-sm max-w-md">
                            Intelligent Medical Supply Forecasting & Emergency Support Platform.
                            Bridging the gap in healthcare supply chain to ensure essential medicines reach where they are needed most.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Platform</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="/dashboard" className="text-base text-gray-500 hover:text-gray-900">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/inventory" className="text-base text-gray-500 hover:text-gray-900">
                                    Inventory
                                </Link>
                            </li>
                            <li>
                                <Link href="/emergency" className="text-base text-gray-500 hover:text-gray-900">
                                    Emergency Support
                                </Link>
                            </li>
                            <li>
                                <Link href="/marketplace" className="text-base text-gray-500 hover:text-gray-900">
                                    Marketplace
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-8">
                    <p className="text-base text-gray-400 text-center">
                        &copy; {new Date().getFullYear()} ShasthoShetu. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
