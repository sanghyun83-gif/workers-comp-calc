"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Scale, Search, ArrowUpDown, HardHat } from "lucide-react";
import { SITE, STATE_WC_DATA, formatCurrency } from "../site-config";

export default function StateRatesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<'name' | 'max' | 'min'>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // Convert to array and sort
    const statesArray = Object.entries(STATE_WC_DATA).map(([code, data]) => ({
        code,
        ...data
    }));

    const filteredStates = statesArray
        .filter(state =>
            state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            state.code.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            let comparison = 0;
            if (sortBy === 'name') {
                comparison = a.name.localeCompare(b.name);
            } else if (sortBy === 'max') {
                comparison = a.maxWeeklyBenefit - b.maxWeeklyBenefit;
            } else if (sortBy === 'min') {
                comparison = a.minWeeklyBenefit - b.minWeeklyBenefit;
            }
            return sortOrder === 'asc' ? comparison : -comparison;
        });

    const handleSort = (column: 'name' | 'max' | 'min') => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder(column === 'name' ? 'asc' : 'desc');
        }
    };

    // Stats
    const maxState = statesArray.reduce((max, s) => s.maxWeeklyBenefit > max.maxWeeklyBenefit ? s : max);
    const minState = statesArray.reduce((min, s) => s.maxWeeklyBenefit < min.maxWeeklyBenefit ? s : min);
    const avgMax = Math.round(statesArray.reduce((sum, s) => sum + s.maxWeeklyBenefit, 0) / statesArray.length);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-amber-400 transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Scale className="w-5 h-5 text-amber-400" />
                        <span className="text-lg font-bold text-white">{SITE.year} State Rates</span>
                    </div>
                    <span className="ml-auto text-xs text-slate-900 bg-amber-400 px-2 py-1 rounded-full font-bold">
                        50 States
                    </span>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">
                        {SITE.year} Workers Comp Maximum Rates by State
                    </h1>
                    <p className="text-slate-500">
                        Compare maximum weekly TTD benefits across all 50 states
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                        <p className="text-xs text-green-600 mb-1">Highest Maximum</p>
                        <p className="text-2xl font-bold text-green-700">{formatCurrency(maxState.maxWeeklyBenefit)}</p>
                        <p className="text-xs text-green-600">{maxState.name}</p>
                    </div>
                    <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 text-center">
                        <p className="text-xs text-slate-500 mb-1">Average Maximum</p>
                        <p className="text-2xl font-bold text-slate-700">{formatCurrency(avgMax)}</p>
                        <p className="text-xs text-slate-500">All States</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                        <p className="text-xs text-red-600 mb-1">Lowest Maximum</p>
                        <p className="text-2xl font-bold text-red-700">{formatCurrency(minState.maxWeeklyBenefit)}</p>
                        <p className="text-xs text-red-600">{minState.name}</p>
                    </div>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search state..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-amber-500"
                        />
                    </div>
                </div>

                {/* Ad Placeholder */}
                <div className="mb-6 p-4 bg-white border border-slate-200 rounded-xl text-center">
                    <p className="text-sm text-slate-400">Advertisement</p>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th
                                        className="px-4 py-3 text-left text-slate-600 font-semibold cursor-pointer hover:bg-slate-200"
                                        onClick={() => handleSort('name')}
                                    >
                                        <span className="flex items-center gap-1">
                                            State
                                            <ArrowUpDown className="w-3 h-3" />
                                        </span>
                                    </th>
                                    <th
                                        className="px-4 py-3 text-right text-slate-600 font-semibold cursor-pointer hover:bg-slate-200"
                                        onClick={() => handleSort('max')}
                                    >
                                        <span className="flex items-center justify-end gap-1">
                                            Max Weekly
                                            <ArrowUpDown className="w-3 h-3" />
                                        </span>
                                    </th>
                                    <th
                                        className="px-4 py-3 text-right text-slate-600 font-semibold cursor-pointer hover:bg-slate-200"
                                        onClick={() => handleSort('min')}
                                    >
                                        <span className="flex items-center justify-end gap-1">
                                            Min Weekly
                                            <ArrowUpDown className="w-3 h-3" />
                                        </span>
                                    </th>
                                    <th className="px-4 py-3 text-center text-slate-600 font-semibold">
                                        TTD Rate
                                    </th>
                                    <th className="px-4 py-3 text-center text-slate-600 font-semibold">
                                        Waiting
                                    </th>
                                    <th className="px-4 py-3 text-left text-slate-600 font-semibold hidden md:table-cell">
                                        Notes
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredStates.map((state, index) => (
                                    <tr
                                        key={state.code}
                                        className={`hover:bg-amber-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                                            }`}
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-slate-800">{state.name}</span>
                                                <span className="text-xs text-slate-400">({state.code})</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <span className={`font-bold ${state.maxWeeklyBenefit >= 1500 ? 'text-green-600' :
                                                    state.maxWeeklyBenefit <= 800 ? 'text-red-600' : 'text-slate-800'
                                                }`}>
                                                {formatCurrency(state.maxWeeklyBenefit)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right text-slate-600">
                                            {formatCurrency(state.minWeeklyBenefit)}
                                        </td>
                                        <td className="px-4 py-3 text-center text-slate-600">
                                            {Math.round(state.ttdRate * 100)}%
                                        </td>
                                        <td className="px-4 py-3 text-center text-slate-600">
                                            {state.waitingPeriod}d
                                        </td>
                                        <td className="px-4 py-3 text-slate-500 text-xs hidden md:table-cell">
                                            {state.notes}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Legend */}
                <div className="mt-6 flex flex-wrap gap-4 justify-center text-xs">
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-green-500 rounded"></span>
                        <span className="text-slate-600">High ($1,500+)</span>
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-slate-500 rounded"></span>
                        <span className="text-slate-600">Average</span>
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-red-500 rounded"></span>
                        <span className="text-slate-600">Low ($800 or less)</span>
                    </span>
                </div>

                {/* CTA */}
                <div className="mt-8 text-center">
                    <Link
                        href="/calculator"
                        className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 px-6 py-3 rounded-lg font-bold transition-colors"
                    >
                        <HardHat className="w-5 h-5" />
                        Calculate Your Benefits →
                    </Link>
                </div>

                {/* Disclaimer */}
                <p className="mt-8 text-xs text-slate-500 text-center">
                    Rates shown are {SITE.year} estimates based on publicly available data.
                    Actual rates may vary. Consult your state&apos;s workers compensation agency for official rates.
                </p>
            </main>
        </div>
    );
}
