"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, HardHat, DollarSign, Info, AlertCircle, CheckCircle } from "lucide-react";
import {
    SITE,
    WC_CONSTANTS_2026,
    STATE_WC_DATA,
    calculateWorkersComp,
    formatCurrency,
    parseFormattedNumber,
    getStatesList,
    getBodyPartsList,
    WorkersCompResult
} from "../site-config";

export default function CalculatorPage() {
    const [state, setState] = useState("CA");
    const [weeklyWage, setWeeklyWage] = useState("");
    const [bodyPart, setBodyPart] = useState("back");
    const [result, setResult] = useState<WorkersCompResult | null>(null);

    const states = getStatesList();
    const bodyParts = getBodyPartsList();
    const selectedState = STATE_WC_DATA[state];

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value.replace(/[^0-9]/g, "");
            if (raw === "") {
                setter("");
                return;
            }
            setter(parseInt(raw).toLocaleString("en-US"));
        };

    const handleCalculate = () => {
        const aww = parseFormattedNumber(weeklyWage) || 1000;
        setResult(calculateWorkersComp(state, aww, bodyPart));
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-10">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-amber-400 transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-amber-400" />
                        <span className="text-lg font-bold text-white">Workers Comp Calculator</span>
                    </div>
                    <span className="ml-auto text-xs text-slate-900 bg-amber-400 px-2 py-1 rounded-full font-bold">
                        {SITE.year}
                    </span>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                {/* Calculator Card */}
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-bold">
                            {SITE.year} State Rates Applied
                        </span>
                    </div>
                    <h1 className="text-xl font-bold text-slate-800 mb-2">
                        Workers Compensation Calculator
                    </h1>
                    <p className="text-sm text-slate-500 mb-6">
                        Calculate your weekly TTD benefits and estimated settlement value
                    </p>

                    {/* Inputs */}
                    <div className="space-y-5 mb-6">
                        {/* State Selection - FIRST */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                1. Select Your State
                            </label>
                            <select
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            >
                                {states.map((s) => (
                                    <option key={s.code} value={s.code}>
                                        {s.name} (Max: {formatCurrency(s.maxBenefit)}/wk)
                                    </option>
                                ))}
                            </select>
                            <p className="text-xs text-amber-600 mt-1">
                                ✓ {selectedState.name}: Max {formatCurrency(selectedState.maxWeeklyBenefit)}/week ({SITE.year})
                            </p>
                        </div>

                        {/* Average Weekly Wage */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                2. Average Weekly Wage (Before Injury)
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                <input
                                    type="text"
                                    value={weeklyWage}
                                    onChange={handleInputChange(setWeeklyWage)}
                                    placeholder="1,200"
                                    className="w-full pl-8 pr-4 py-4 text-lg bg-white border-2 border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                />
                            </div>
                            <p className="text-xs text-slate-400 mt-1">Your gross weekly pay before your injury</p>
                        </div>

                        {/* Body Part - KILLER FEATURE */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                3. Injured Body Part
                            </label>
                            <select
                                value={bodyPart}
                                onChange={(e) => setBodyPart(e.target.value)}
                                className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            >
                                {bodyParts.map((part) => (
                                    <option key={part.id} value={part.id}>
                                        {part.name}
                                    </option>
                                ))}
                            </select>
                            <p className="text-xs text-slate-400 mt-1">Body part affects settlement value (schedule of loss)</p>
                        </div>
                    </div>

                    {/* Calculate Button */}
                    <button
                        onClick={handleCalculate}
                        className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-md"
                    >
                        <Calculator className="w-5 h-5" />
                        Calculate Benefits
                    </button>
                </div>

                {/* Results */}
                {result && (
                    <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        {/* Weekly Benefit */}
                        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6">
                            <p className="text-sm text-slate-300 mb-1">Estimated Weekly TTD Benefit</p>
                            <p className="text-4xl font-bold text-amber-400">{formatCurrency(result.weeklyBenefit)}<span className="text-lg text-slate-400">/week</span></p>
                            {result.stateMaxApplied && (
                                <div className="mt-2 flex items-center gap-1 text-amber-300 text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>Capped at {result.stateName} {SITE.year} maximum</span>
                                </div>
                            )}
                        </div>

                        {/* Settlement Estimate - KILLER FEATURE */}
                        <div className="bg-green-50 border-b border-green-200 p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="w-5 h-5 text-green-600" />
                                <span className="font-bold text-green-800">Potential Settlement Value</span>
                            </div>
                            <p className="text-3xl font-bold text-green-600">
                                {formatCurrency(result.settlementLow)} - {formatCurrency(result.settlementHigh)}
                            </p>
                            <p className="text-sm text-green-700 mt-2">
                                Based on {result.bodyPartName} injury ({result.weeksOfBenefits} weeks schedule)
                            </p>
                        </div>

                        {/* Breakdown */}
                        <div className="p-6">
                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                                Calculation Breakdown
                            </h3>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between py-2 border-b border-slate-100">
                                    <span className="text-slate-600">State</span>
                                    <span className="font-medium text-slate-800">{result.stateName}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-100">
                                    <span className="text-slate-600">Average Weekly Wage</span>
                                    <span className="font-medium text-slate-800">{formatCurrency(result.averageWeeklyWage)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-100">
                                    <span className="text-slate-600">TTD Rate</span>
                                    <span className="font-medium text-slate-800">{Math.round(STATE_WC_DATA[result.state].ttdRate * 100)}%</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-100">
                                    <span className="text-slate-600">State Maximum ({SITE.year})</span>
                                    <span className="font-medium text-slate-800">{formatCurrency(result.stateMax)}/wk</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-100">
                                    <span className="text-slate-600">Injured Body Part</span>
                                    <span className="font-medium text-slate-800">{result.bodyPartName}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-100">
                                    <span className="text-slate-600">Waiting Period</span>
                                    <span className="font-medium text-slate-800">{result.waitingPeriod} days</span>
                                </div>
                                <div className="flex justify-between pt-4 text-lg border-t border-slate-200">
                                    <span className="text-slate-800 font-bold">Weekly Benefit</span>
                                    <span className="font-bold text-amber-600">{formatCurrency(result.weeklyBenefit)}</span>
                                </div>
                                <div className="flex justify-between py-2 text-lg">
                                    <span className="text-slate-800 font-bold">Monthly (4 weeks)</span>
                                    <span className="font-bold text-amber-600">{formatCurrency(result.weeklyBenefit * 4)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Ad Placeholder */}
                <div className="my-8 p-6 bg-white border border-slate-200 rounded-xl text-center shadow-sm">
                    <p className="text-sm text-slate-400">Advertisement</p>
                </div>

                {/* FAQ Section */}
                <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Info className="w-5 h-5 text-amber-500" />
                        Workers Comp FAQ
                    </h2>

                    <div className="space-y-4 text-sm">
                        <div>
                            <h3 className="font-semibold text-slate-800 mb-1">
                                Will my workers comp benefits increase in {SITE.year}?
                            </h3>
                            <p className="text-slate-600">
                                Most states update their maximum weekly benefit rates annually on January 1st.
                                The {SITE.year} rates shown here reflect the latest state maximums.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-800 mb-1">
                                How is settlement calculated?
                            </h3>
                            <p className="text-slate-600">
                                Settlement value depends on your weekly benefit rate, the body part injured
                                (schedule of loss), severity of injury, and future impact on your earning capacity.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-800 mb-1">
                                Can I sue my employer for a work injury?
                            </h3>
                            <p className="text-slate-600">
                                In most states, workers compensation is a &quot;no-fault&quot; system, meaning you
                                receive benefits regardless of fault but generally cannot sue your employer.
                                However, you may be able to sue third parties. Consult an attorney for your specific case.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-8 text-center">
                    <Link
                        href="/state-rates"
                        className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        View All 50 State Rates →
                    </Link>
                </div>

                {/* Disclaimer */}
                <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                        <p className="text-xs text-amber-800">
                            <strong>Disclaimer:</strong> This is an estimate only based on {SITE.year} state rates
                            and general formulas. Not legal advice. Actual benefits depend on your specific claim,
                            employer, and insurer. Consult a workers compensation attorney for accurate benefit calculations.
                        </p>
                    </div>
                </div>
            </main>

            {/* Schema.org FAQPage */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: [
                            {
                                "@type": "Question",
                                name: `Will my workers comp benefits increase in ${SITE.year}?`,
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text: `Most states update their maximum weekly benefit rates annually. The ${SITE.year} rates reflect the latest state maximums.`,
                                },
                            },
                            {
                                "@type": "Question",
                                name: "How is workers comp settlement calculated?",
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text: "Settlement value depends on weekly benefit rate, body part injured (schedule of loss), severity, and future earning impact.",
                                },
                            },
                            {
                                "@type": "Question",
                                name: "Can I sue my employer for a work injury?",
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text: "In most states, workers comp is no-fault so you cannot sue your employer, but you may sue third parties. Consult an attorney.",
                                },
                            },
                        ],
                    }),
                }}
            />
        </div>
    );
}
