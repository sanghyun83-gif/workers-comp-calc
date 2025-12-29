// ============================================
// WORKERS-COMP-CALC SITE CONFIGURATION
// 2026 Workers Compensation Calculator
// 50 State Maximum Weekly Benefits
// ============================================

import { Calculator, Scale, FileText, DollarSign, Shield, HardHat } from 'lucide-react';

// ============================================
// SITE METADATA
// ============================================
export const SITE = {
    name: "Workers Comp Calculator",
    tagline: "2026 State Maximum Rates Applied",
    description: "Calculate your workers compensation benefits for 2026. Free calculator with 50 state maximum rates, TTD calculation, and settlement estimator.",
    year: 2026,
    baseUrl: "https://workers-comp-calc.vercel.app",
};

// ============================================
// 2026 WORKERS COMP CONSTANTS
// ============================================
export const WC_CONSTANTS_2026 = {
    // Standard TTD rate (most states)
    ttdRate: 0.6667, // 66.67% (2/3) of AWW

    // Settlement multipliers by body part
    bodyPartMultipliers: {
        back: { weeks: 300, multiplier: 1.5, name: "Back/Spine" },
        neck: { weeks: 250, multiplier: 1.4, name: "Neck" },
        shoulder: { weeks: 175, multiplier: 1.2, name: "Shoulder" },
        knee: { weeks: 175, multiplier: 1.2, name: "Knee" },
        hand: { weeks: 175, multiplier: 1.1, name: "Hand" },
        arm: { weeks: 200, multiplier: 1.2, name: "Arm" },
        leg: { weeks: 200, multiplier: 1.2, name: "Leg" },
        head: { weeks: 400, multiplier: 2.0, name: "Head/TBI" },
        wrist: { weeks: 150, multiplier: 1.1, name: "Wrist" },
        ankle: { weeks: 150, multiplier: 1.1, name: "Ankle" },
        other: { weeks: 150, multiplier: 1.0, name: "Other" },
    },

    // Settlement variance (for range calculation)
    settlementVariance: 0.3, // ±30%
};

// ============================================
// 50 STATE 2026 MAXIMUM WEEKLY BENEFITS
// Source: State workers comp agencies
// ============================================
export const STATE_WC_DATA: Record<string, {
    name: string;
    maxWeeklyBenefit: number;
    minWeeklyBenefit: number;
    ttdRate: number;
    waitingPeriod: number; // days
    notes: string;
}> = {
    AL: { name: "Alabama", maxWeeklyBenefit: 1135, minWeeklyBenefit: 275, ttdRate: 0.6667, waitingPeriod: 3, notes: "66.67% of AWW" },
    AK: { name: "Alaska", maxWeeklyBenefit: 1588, minWeeklyBenefit: 298, ttdRate: 0.80, waitingPeriod: 3, notes: "80% of spendable earnings" },
    AZ: { name: "Arizona", maxWeeklyBenefit: 1211, minWeeklyBenefit: 0, ttdRate: 0.6667, waitingPeriod: 7, notes: "66.67% of AWW" },
    AR: { name: "Arkansas", maxWeeklyBenefit: 790, minWeeklyBenefit: 20, ttdRate: 0.6667, waitingPeriod: 7, notes: "66.67% of AWW" },
    CA: { name: "California", maxWeeklyBenefit: 1676, minWeeklyBenefit: 225, ttdRate: 0.6667, waitingPeriod: 3, notes: "66.67% of AWW, high max" },
    CO: { name: "Colorado", maxWeeklyBenefit: 1272, minWeeklyBenefit: 318, ttdRate: 0.6667, waitingPeriod: 3, notes: "66.67% of AWW" },
    CT: { name: "Connecticut", maxWeeklyBenefit: 1636, minWeeklyBenefit: 327, ttdRate: 0.75, waitingPeriod: 3, notes: "75% of AWW" },
    DE: { name: "Delaware", maxWeeklyBenefit: 893, minWeeklyBenefit: 267, ttdRate: 0.6667, waitingPeriod: 3, notes: "66.67% of AWW" },
    FL: { name: "Florida", maxWeeklyBenefit: 1197, minWeeklyBenefit: 20, ttdRate: 0.6667, waitingPeriod: 7, notes: "66.67% of AWW" },
    GA: { name: "Georgia", maxWeeklyBenefit: 800, minWeeklyBenefit: 50, ttdRate: 0.6667, waitingPeriod: 7, notes: "66.67% of AWW" },
    HI: { name: "Hawaii", maxWeeklyBenefit: 1188, minWeeklyBenefit: 297, ttdRate: 0.6667, waitingPeriod: 3, notes: "66.67% of AWW" },
    ID: { name: "Idaho", maxWeeklyBenefit: 873, minWeeklyBenefit: 291, ttdRate: 0.6667, waitingPeriod: 5, notes: "67% of AWW" },
    IL: { name: "Illinois", maxWeeklyBenefit: 1910, minWeeklyBenefit: 286, ttdRate: 0.6667, waitingPeriod: 3, notes: "66.67% of AWW, high max" },
    IN: { name: "Indiana", maxWeeklyBenefit: 918, minWeeklyBenefit: 50, ttdRate: 0.6667, waitingPeriod: 7, notes: "66.67% of AWW" },
    IA: { name: "Iowa", maxWeeklyBenefit: 2047, minWeeklyBenefit: 307, ttdRate: 0.80, waitingPeriod: 3, notes: "80% spendable, high max" },
    KS: { name: "Kansas", maxWeeklyBenefit: 771, minWeeklyBenefit: 25, ttdRate: 0.6667, waitingPeriod: 7, notes: "66.67% of AWW" },
    KY: { name: "Kentucky", maxWeeklyBenefit: 1036, minWeeklyBenefit: 206, ttdRate: 0.6667, waitingPeriod: 7, notes: "66.67% of AWW" },
    LA: { name: "Louisiana", maxWeeklyBenefit: 806, minWeeklyBenefit: 201, ttdRate: 0.6667, waitingPeriod: 7, notes: "66.67% of AWW" },
    ME: { name: "Maine", maxWeeklyBenefit: 1135, minWeeklyBenefit: 227, ttdRate: 0.80, waitingPeriod: 7, notes: "80% of AWW" },
    MD: { name: "Maryland", maxWeeklyBenefit: 1252, minWeeklyBenefit: 50, ttdRate: 0.6667, waitingPeriod: 3, notes: "66.67% of AWW" },
    MA: { name: "Massachusetts", maxWeeklyBenefit: 1796, minWeeklyBenefit: 359, ttdRate: 0.60, waitingPeriod: 5, notes: "60% of AWW" },
    MI: { name: "Michigan", maxWeeklyBenefit: 1155, minWeeklyBenefit: 346, ttdRate: 0.80, waitingPeriod: 7, notes: "80% spendable" },
    MN: { name: "Minnesota", maxWeeklyBenefit: 1374, minWeeklyBenefit: 173, ttdRate: 0.6667, waitingPeriod: 3, notes: "66.67% of AWW" },
    MS: { name: "Mississippi", maxWeeklyBenefit: 603, minWeeklyBenefit: 25, ttdRate: 0.6667, waitingPeriod: 5, notes: "66.67% of AWW, low max" },
    MO: { name: "Missouri", maxWeeklyBenefit: 1138, minWeeklyBenefit: 40, ttdRate: 0.6667, waitingPeriod: 3, notes: "66.67% of AWW" },
    MT: { name: "Montana", maxWeeklyBenefit: 889, minWeeklyBenefit: 356, ttdRate: 0.6667, waitingPeriod: 5, notes: "66.67% of AWW" },
    NE: { name: "Nebraska", maxWeeklyBenefit: 1092, minWeeklyBenefit: 72, ttdRate: 0.6667, waitingPeriod: 7, notes: "66.67% of AWW" },
    NV: { name: "Nevada", maxWeeklyBenefit: 1119, minWeeklyBenefit: 280, ttdRate: 0.6667, waitingPeriod: 5, notes: "66.67% of AWW" },
    NH: { name: "New Hampshire", maxWeeklyBenefit: 1973, minWeeklyBenefit: 394, ttdRate: 0.60, waitingPeriod: 3, notes: "60% of AWW, high max" },
    NJ: { name: "New Jersey", maxWeeklyBenefit: 1099, minWeeklyBenefit: 275, ttdRate: 0.70, waitingPeriod: 7, notes: "70% of AWW" },
    NM: { name: "New Mexico", maxWeeklyBenefit: 978, minWeeklyBenefit: 102, ttdRate: 0.6667, waitingPeriod: 7, notes: "66.67% of AWW" },
    NY: { name: "New York", maxWeeklyBenefit: 1145, minWeeklyBenefit: 275, ttdRate: 0.6667, waitingPeriod: 7, notes: "66.67% of AWW" },
    NC: { name: "North Carolina", maxWeeklyBenefit: 1254, minWeeklyBenefit: 30, ttdRate: 0.6667, waitingPeriod: 7, notes: "66.67% of AWW" },
    ND: { name: "North Dakota", maxWeeklyBenefit: 1288, minWeeklyBenefit: 600, ttdRate: 0.6667, waitingPeriod: 5, notes: "66.67% of AWW" },
    OH: { name: "Ohio", maxWeeklyBenefit: 1170, minWeeklyBenefit: 293, ttdRate: 0.6667, waitingPeriod: 7, notes: "66.67% of AWW" },
    OK: { name: "Oklahoma", maxWeeklyBenefit: 1035, minWeeklyBenefit: 172, ttdRate: 0.70, waitingPeriod: 3, notes: "70% of AWW" },
    OR: { name: "Oregon", maxWeeklyBenefit: 1517, minWeeklyBenefit: 379, ttdRate: 0.6667, waitingPeriod: 3, notes: "66.67% of AWW" },
    PA: { name: "Pennsylvania", maxWeeklyBenefit: 1325, minWeeklyBenefit: 331, ttdRate: 0.6667, waitingPeriod: 7, notes: "66.67% of AWW" },
    RI: { name: "Rhode Island", maxWeeklyBenefit: 1226, minWeeklyBenefit: 184, ttdRate: 0.75, waitingPeriod: 3, notes: "75% of AWW" },
    SC: { name: "South Carolina", maxWeeklyBenefit: 1006, minWeeklyBenefit: 75, ttdRate: 0.6667, waitingPeriod: 7, notes: "66.67% of AWW" },
    SD: { name: "South Dakota", maxWeeklyBenefit: 989, minWeeklyBenefit: 494, ttdRate: 0.6667, waitingPeriod: 7, notes: "66.67% of AWW" },
    TN: { name: "Tennessee", maxWeeklyBenefit: 1238, minWeeklyBenefit: 185, ttdRate: 0.6667, waitingPeriod: 7, notes: "66.67% of AWW" },
    TX: { name: "Texas", maxWeeklyBenefit: 1156, minWeeklyBenefit: 173, ttdRate: 0.70, waitingPeriod: 7, notes: "70% of AWW" },
    UT: { name: "Utah", maxWeeklyBenefit: 1121, minWeeklyBenefit: 72, ttdRate: 0.6667, waitingPeriod: 3, notes: "66.67% of AWW" },
    VT: { name: "Vermont", maxWeeklyBenefit: 1337, minWeeklyBenefit: 267, ttdRate: 0.6667, waitingPeriod: 3, notes: "66.67% of AWW" },
    VA: { name: "Virginia", maxWeeklyBenefit: 1347, minWeeklyBenefit: 337, ttdRate: 0.6667, waitingPeriod: 7, notes: "66.67% of AWW" },
    WA: { name: "Washington", maxWeeklyBenefit: 1765, minWeeklyBenefit: 353, ttdRate: 0.60, waitingPeriod: 3, notes: "60-75% of wage, state fund" },
    WV: { name: "West Virginia", maxWeeklyBenefit: 1052, minWeeklyBenefit: 263, ttdRate: 0.6667, waitingPeriod: 3, notes: "66.67% of AWW" },
    WI: { name: "Wisconsin", maxWeeklyBenefit: 1233, minWeeklyBenefit: 370, ttdRate: 0.6667, waitingPeriod: 3, notes: "66.67% of AWW" },
    WY: { name: "Wyoming", maxWeeklyBenefit: 1044, minWeeklyBenefit: 522, ttdRate: 0.6667, waitingPeriod: 3, notes: "66.67% of AWW" },
    DC: { name: "Washington DC", maxWeeklyBenefit: 1807, minWeeklyBenefit: 451, ttdRate: 0.6667, waitingPeriod: 3, notes: "66.67% of AWW, high max" },
};

// States with highest max benefits
export const TOP_STATES = ['IA', 'NH', 'IL', 'DC', 'MA', 'WA', 'CA'];

// ============================================
// CALCULATOR DEFINITIONS
// ============================================
export const CALCULATORS = [
    {
        id: "calculator",
        name: "Workers Comp Calculator",
        shortName: "Calculator",
        description: "Calculate weekly benefits and settlement estimate",
        longDescription: "Free 2026 workers compensation calculator. Estimate your TTD benefits and potential settlement based on state laws and injury type.",
        icon: Calculator,
        category: "legal",
        keywords: ["workers comp calculator", "TTD calculator", "workers compensation"],
        featured: true,
    },
    {
        id: "state-rates",
        name: "2026 State Maximum Rates",
        shortName: "State Rates",
        description: "Compare workers comp limits by state",
        longDescription: "Compare 2026 workers compensation maximum weekly benefits across all 50 states.",
        icon: Scale,
        category: "legal",
        keywords: ["workers comp by state", "state maximum rates", "TTD limits"],
        featured: false,
    },
] as const;

// ============================================
// WORKERS COMP CALCULATION FUNCTION
// ============================================
export interface WorkersCompResult {
    state: string;
    stateName: string;
    averageWeeklyWage: number;
    weeklyBenefit: number;
    stateMaxApplied: boolean;
    stateMax: number;
    bodyPart: string;
    bodyPartName: string;
    settlementLow: number;
    settlementHigh: number;
    weeksOfBenefits: number;
    waitingPeriod: number;
}

export function calculateWorkersComp(
    stateCode: string,
    averageWeeklyWage: number,
    bodyPart: string = 'other'
): WorkersCompResult {
    const state = STATE_WC_DATA[stateCode] || STATE_WC_DATA['CA'];
    const constants = WC_CONSTANTS_2026;
    const bodyPartData = constants.bodyPartMultipliers[bodyPart as keyof typeof constants.bodyPartMultipliers] 
        || constants.bodyPartMultipliers.other;

    // Calculate TTD (Temporary Total Disability) benefit
    let weeklyBenefit = Math.round(averageWeeklyWage * state.ttdRate);
    let stateMaxApplied = false;

    // Apply state maximum cap
    if (weeklyBenefit > state.maxWeeklyBenefit) {
        weeklyBenefit = state.maxWeeklyBenefit;
        stateMaxApplied = true;
    }

    // Apply state minimum
    if (weeklyBenefit < state.minWeeklyBenefit && averageWeeklyWage > 0) {
        weeklyBenefit = state.minWeeklyBenefit;
    }

    // Calculate settlement estimate based on body part
    const weeksOfBenefits = bodyPartData.weeks;
    const baseSettlement = weeklyBenefit * weeksOfBenefits * bodyPartData.multiplier;
    
    // Apply variance for range
    const settlementLow = Math.round(baseSettlement * (1 - constants.settlementVariance));
    const settlementHigh = Math.round(baseSettlement * (1 + constants.settlementVariance));

    return {
        state: stateCode,
        stateName: state.name,
        averageWeeklyWage,
        weeklyBenefit,
        stateMaxApplied,
        stateMax: state.maxWeeklyBenefit,
        bodyPart,
        bodyPartName: bodyPartData.name,
        settlementLow,
        settlementHigh,
        weeksOfBenefits,
        waitingPeriod: state.waitingPeriod,
    };
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function parseFormattedNumber(value: string): number {
    return parseInt(value.replace(/[^0-9]/g, '')) || 0;
}

export function getStatesList(): { code: string; name: string; maxBenefit: number }[] {
    return Object.entries(STATE_WC_DATA).map(([code, data]) => ({
        code,
        name: data.name,
        maxBenefit: data.maxWeeklyBenefit,
    })).sort((a, b) => a.name.localeCompare(b.name));
}

export function getBodyPartsList(): { id: string; name: string; weeks: number }[] {
    return Object.entries(WC_CONSTANTS_2026.bodyPartMultipliers).map(([id, data]) => ({
        id,
        name: data.name,
        weeks: data.weeks,
    }));
}
