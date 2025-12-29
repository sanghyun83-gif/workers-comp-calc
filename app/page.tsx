import Link from "next/link";
import { SITE, CALCULATORS, STATE_WC_DATA, formatCurrency, TOP_STATES } from "./site-config";
import { ArrowRight, Shield, CheckCircle, HardHat, Scale, AlertTriangle } from "lucide-react";

export default function Home() {
  const featuredCalculators = CALCULATORS.filter(c => c.featured);
  const otherCalculators = CALCULATORS.filter(c => !c.featured);

  // Get top state max benefits for display
  const topStateData = TOP_STATES.slice(0, 4).map(code => ({
    code,
    ...STATE_WC_DATA[code]
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardHat className="w-6 h-6 text-amber-400" />
            <span className="text-lg font-bold text-white">{SITE.name}</span>
          </div>
          <span className="text-xs text-slate-900 bg-amber-400 px-3 py-1 rounded-full font-bold">
            {SITE.year} RATES
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/50 rounded-full px-4 py-2 mb-6">
            <CheckCircle className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-200">{SITE.year} State Maximum Rates Applied</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {SITE.year} Workers Comp
            <span className="block text-amber-400">Calculator</span>
          </h1>

          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Calculate your workers compensation benefits and estimated settlement value.
            All 50 states with {SITE.year} maximum rates.
          </p>

          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg"
          >
            <HardHat className="w-5 h-5" />
            Calculate Benefits
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <p className="text-3xl font-bold text-amber-600">50</p>
              <p className="text-sm text-slate-500 mt-1">States Covered</p>
            </div>
            <div className="text-center p-4">
              <p className="text-3xl font-bold text-slate-800">{formatCurrency(STATE_WC_DATA.IA.maxWeeklyBenefit)}</p>
              <p className="text-sm text-slate-500 mt-1">Highest Max (Iowa)</p>
            </div>
            <div className="text-center p-4">
              <p className="text-3xl font-bold text-slate-800">66.67%</p>
              <p className="text-sm text-slate-500 mt-1">Standard TTD Rate</p>
            </div>
            <div className="text-center p-4">
              <p className="text-3xl font-bold text-green-600">{SITE.year}</p>
              <p className="text-sm text-slate-500 mt-1">Updated Rates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Calculator */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
          Free {SITE.year} Workers Comp Tools
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {featuredCalculators.map((calc) => {
            const IconComponent = calc.icon;
            return (
              <Link
                key={calc.id}
                href={`/${calc.id}`}
                className="group bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-amber-500 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-100 rounded-lg group-hover:bg-amber-500 transition-colors">
                    <IconComponent className="w-6 h-6 text-amber-600 group-hover:text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800 group-hover:text-amber-600 transition-colors">
                      {calc.name}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {calc.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-amber-600 text-sm mt-3 font-semibold group-hover:gap-2 transition-all">
                      Calculate Now <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Other Tools */}
        {otherCalculators.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4">
            {otherCalculators.map((calc) => {
              const IconComponent = calc.icon;
              return (
                <Link
                  key={calc.id}
                  href={`/${calc.id}`}
                  className="group bg-white border border-slate-200 rounded-lg p-4 hover:border-amber-500 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5 text-slate-400 group-hover:text-amber-600" />
                    <span className="text-sm text-slate-600 group-hover:text-amber-600 font-medium">
                      {calc.shortName}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Top States Preview */}
      <section className="bg-slate-100 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">
            {SITE.year} Highest Maximum Weekly Benefits
          </h2>
          <p className="text-slate-500 text-center mb-8">
            States with the highest workers comp benefit caps
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topStateData.map((state) => (
              <div key={state.code} className="bg-white rounded-xl p-4 text-center border border-slate-200">
                <p className="text-xs text-slate-500 mb-1">{state.name}</p>
                <p className="text-2xl font-bold text-amber-600">{formatCurrency(state.maxWeeklyBenefit)}</p>
                <p className="text-xs text-slate-400 mt-1">per week</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link
              href="/state-rates"
              className="text-amber-600 hover:text-amber-700 font-medium text-sm"
            >
              View all 50 states →
            </Link>
          </div>
        </div>
      </section>

      {/* What is Workers Comp */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
          What Is Workers Compensation?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">TTD Benefits</h3>
            <p className="text-sm text-slate-500">
              Temporary Total Disability pays ~66.67% of your average weekly wage while you recover.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Scale className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Settlement</h3>
            <p className="text-sm text-slate-500">
              A lump sum payment based on injury severity, body part, and future impact on earnings.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <AlertTriangle className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">State Laws</h3>
            <p className="text-sm text-slate-500">
              Each state has different maximum benefits, waiting periods, and calculation methods.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Calculate Your {SITE.year} Benefits Now
          </h2>
          <p className="text-slate-400 mb-8">
            Get your estimated weekly benefit and potential settlement value in under 2 minutes.
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-xl font-bold transition-colors"
          >
            <HardHat className="w-5 h-5" />
            Start Calculator
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <HardHat className="w-5 h-5 text-amber-400" />
              <span className="font-semibold">{SITE.name}</span>
            </div>
            <p className="text-sm text-slate-400 text-center">
              Estimates only. Not legal advice. Consult a workers comp attorney for your specific case.
            </p>
            <p className="text-sm text-slate-500">
              © {SITE.year} {SITE.name}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
