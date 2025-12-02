"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import axios from "axios";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    const [predictions, setPredictions] = useState<any[]>([]);

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (!userInfo) {
            router.push("/login");
        } else {
            setUser(JSON.parse(userInfo));
            fetchPredictions(JSON.parse(userInfo).token);
        }
    }, [router]);

    const fetchPredictions = async (token: string) => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/predictions`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPredictions(data);
        } catch (error) {
            console.error("Failed to fetch predictions", error);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Welcome back, {user.name}
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Role: <span className="font-medium">{user.role}</span>
                    </p>

                    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Stats Cards */}
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <dt className="text-sm font-medium text-gray-500 truncate">
                                    Total Inventory Items
                                </dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                    -
                                </dd>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <dt className="text-sm font-medium text-gray-500 truncate">
                                    Active Alerts
                                </dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                    -
                                </dd>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <dt className="text-sm font-medium text-gray-500 truncate">
                                    Pending Requests
                                </dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                    -
                                </dd>
                            </div>
                        </div>
                    </div>

                    {/* Predictions Section */}
                    <div className="mt-8">
                        <h2 className="text-lg font-medium text-gray-900">Shortage Predictions</h2>
                        <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
                            {predictions.length > 0 ? (
                                <ul className="divide-y divide-gray-200">
                                    {predictions.map((pred, index) => (
                                        <li key={index}>
                                            <div className="px-4 py-4 sm:px-6">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium text-red-600 truncate">
                                                        {pred.item}
                                                    </p>
                                                    <div className="ml-2 flex-shrink-0 flex">
                                                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                            {pred.predictedStockout}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mt-2 sm:flex sm:justify-between">
                                                    <div className="sm:flex">
                                                        <p className="flex items-center text-sm text-gray-500">
                                                            Current Stock: {pred.currentStock} (Threshold: {pred.threshold})
                                                        </p>
                                                    </div>
                                                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                        <p>
                                                            Recommendation: {pred.recommendation}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="px-4 py-5 sm:p-6 text-center text-gray-500">
                                    No shortages predicted at this time.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
