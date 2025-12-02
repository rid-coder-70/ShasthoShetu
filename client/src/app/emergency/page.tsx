"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Navbar from "../../components/Navbar";

export default function Emergency() {
    const [emergencies, setEmergencies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmergencies = async () => {
            const userInfo = localStorage.getItem("userInfo");
            if (userInfo) {
                const { token } = JSON.parse(userInfo);
                try {
                    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/emergency`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setEmergencies(data);
                } catch (error) {
                    console.error("Failed to fetch emergencies", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchEmergencies();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900">Emergency Alerts</h1>
                        <Link
                            href="/emergency/create"
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                            Raise Emergency
                        </Link>
                    </div>

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {emergencies.map((emergency) => (
                                <div key={emergency._id} className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-red-500">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            {emergency.type}
                                        </h3>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                            {emergency.description}
                                        </p>
                                        <div className="mt-4">
                                            <p className="text-sm font-medium text-gray-900">
                                                Contact: {emergency.contactNumber}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Location: {emergency.location?.address || "N/A"}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-2">
                                                Posted by: {emergency.user?.name} ({emergency.user?.organizationName})
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
