"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Navbar from "../../components/Navbar";

export default function Marketplace() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            const userInfo = localStorage.getItem("userInfo");
            if (userInfo) {
                const { token } = JSON.parse(userInfo);
                try {
                    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/marketplace`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setItems(data);
                } catch (error) {
                    console.error("Failed to fetch marketplace items", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchItems();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900">Redistribution Marketplace</h1>
                        <Link
                            href="/marketplace/add"
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Sell Surplus Item
                        </Link>
                    </div>

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {items.map((item) => (
                                <div key={item._id} className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            {item.name}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Quantity: {item.quantity} {item.unit}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Price: ৳{item.price} / unit
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Expires: {new Date(item.expiryDate).toLocaleDateString()}
                                        </p>
                                        <p className="mt-2 text-sm text-gray-700">
                                            {item.description}
                                        </p>
                                        <div className="mt-4 border-t pt-4">
                                            <p className="text-xs text-gray-400">
                                                Seller: {item.seller?.name} ({item.seller?.organizationName})
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                Location: {item.seller?.location?.address || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
