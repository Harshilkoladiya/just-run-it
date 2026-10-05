import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

export type LessonInfo = {
  title: string;
  category: string;
  level: string;
  minutes: number;
  summary: string;
};

function H({ children }: { children: ReactNode }) {
  return <h3 className="mt-10 text-3xl text-foreground">{children}</h3>;
}
function P({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{children}</p>;
}

function B({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <li>
      <span className="mr-2 text-primary">·</span>
      <span className="text-foreground">{label}:</span> {children}
    </li>
  );
}

function SipContent() {
  return (
    <>
      <H>What is a SIP?</H>
      <P>
        A Systematic Investment Plan (SIP) represents an investment methodology that enables you
        to allocate a predetermined sum of capital into a mutual fund scheme at consistent
        intervals—typically on a monthly, quarterly, or weekly basis. Rather than committing a
        substantial lump sum simultaneously, you progressively develop your investment portfolio
        throughout an extended timeframe.
      </P>
      <p className="mt-6 text-lg font-semibold text-foreground">Operational Mechanism</p>
      <ul className="mt-3 space-y-3 text-lg leading-relaxed text-muted-foreground">
        <B label="Establishment & Automated Processing">
          You select a mutual fund scheme, designate an investment amount (frequently commencing
          at ₹500 or $10), and establish a recurring transaction date. On the designated date,
          funds are automatically withdrawn from your bank account.
        </B>
        <B label="Unit Acquisition">
          The fund manager deploys your capital to purchase "units" of the mutual fund at the
          prevailing market valuation, referred to as the Net Asset Value (NAV).
        </B>
        <B label="Currency-Cost Averaging">
          During periods of market decline, the NAV diminishes, enabling your consistent monthly
          contribution to acquire a greater quantity of units. Conversely, during market
          appreciation, the NAV increases, resulting in the acquisition of fewer units. This
          systematic approach reduces your average acquisition cost per unit over time without
          necessitating precise market timing.
        </B>
        <B label="Compounding Accumulation">
          The earnings generated from your investments produce supplementary returns
          progressively. As your cumulative invested capital expands, the compounding mechanism
          accelerates wealth accumulation.
        </B>
      </ul>
      <p className="mt-6 text-lg font-semibold text-foreground">Illustrative Scenario</p>
      <P>Consider establishing a monthly SIP contribution of ₹2,000:</P>
      <ul className="mt-3 space-y-3 text-lg leading-relaxed text-muted-foreground">
        <B label="Month 1">The fund NAV stands at ₹20 → You obtain 100 units (₹2,000 ÷ ₹20).</B>
        <B label="Month 2">
          Market conditions deteriorate and NAV declines to ₹10 → You obtain 200 units (₹2,000 ÷ ₹10).
        </B>
        <B label="Month 3">
          Market conditions improve and NAV increases to ₹25 → You obtain 80 units (₹2,000 ÷ ₹25).
        </B>
      </ul>
      <P>
        Throughout the 3-month period, your total capital invested amounts to ₹6,000, and you
        have accumulated 380 units at an average acquisition cost of ₹15.78 per unit—illustrating
        how market downturns facilitate the procurement of additional units at reduced valuations.
      </P>
    </>
  );
}

function MfContent() {
  return (
    <>
      <H>What is a Mutual Fund?</H>
      <P>
        A Mutual Fund represents a financial instrument that aggregates capital from numerous
        investors to establish a diversified portfolio comprising securities such as equities,
        fixed-income instruments, or money market instruments.
      </P>
      <P>
        Rather than acquiring individual equity shares in separate enterprises, investors purchase
        "units" representing their stake in the mutual fund. Qualified investment professionals
        subsequently manage the analytical research, investment strategy, and portfolio
        transactions associated with these consolidated assets on behalf of the investors.
      </P>
      <p className="mt-6 text-lg font-semibold text-foreground">Operational Framework</p>
      <ul className="mt-3 space-y-3 text-lg leading-relaxed text-muted-foreground">
        <B label="Capital Aggregation">
          Numerous individual investors contribute funds into a unified investment pool
          administered by an Asset Management Company (AMC).
        </B>
        <B label="Expert Fund Administration">
          Seasoned investment managers examine market conditions, evaluate corporate entities, and
          distribute the aggregated capital across various financial instruments in accordance
          with the fund's stated objective (such as capital appreciation, income generation, or
          asset preservation).
        </B>
        <B label="Unit Distribution & Net Asset Value">
          Your capital acquisition results in fund units. The valuation of each unit, termed the
          Net Asset Value (NAV), is determined on a daily basis by calculating the aggregate market
          valuation of all fund holdings divided by the total quantity of issued units.
        </B>
        <B label="Investment Returns & Capital Appreciation">
          When underlying equities or debt instruments generate dividend income, interest
          payments, or value appreciation, the fund's NAV correspondingly increases. Investors
          achieve returns when the NAV exceeds their initial investment cost or upon distribution
          of dividend income.
        </B>
      </ul>
      <p className="mt-6 text-lg font-semibold text-foreground">Illustrative Scenario</p>
      <P>Consider an art institution seeking to acquire a ₹10,000,000 artwork:</P>
      <ul className="mt-3 space-y-3 text-lg leading-relaxed text-muted-foreground">
        <B label="Individual Acquisition">
          The majority of individuals lack the financial capacity to allocate ₹10,000,000 for a
          single art acquisition.
        </B>
        <B label="Mutual Fund Structure">
          One thousand investors collectively contribute ₹10,000 each to finance the artwork
          purchase. Each participant maintains a proportional ownership interest in the acquired
          artwork.
        </B>
        <B label="Outcome">
          Should the artwork appreciate to ₹15,000,000 in valuation, each investor's initial
          ₹10,000 contribution appreciates to ₹15,000, representing a 50% return on investment
          without requiring substantial initial capital.
        </B>
      </ul>
    </>
  );
}

function RealEstateContent() {
  return (
    <>
      <H>What is Real Estate?</H>
      <P>
        Real Estate encompasses tangible property comprising land and any permanent improvements
        or natural resources affixed to it, including structures such as buildings, residences,
        fencing, infrastructure, and water features.
      </P>
      <P>
        This asset class represents one of the most established investment categories, typically
        classified into four principal segments: Residential properties (dwellings, multi-unit
        complexes), Commercial properties (office buildings, retail establishments), Industrial
        properties (manufacturing facilities, storage centers), and Land assets (vacant parcels).
      </P>
      <p className="mt-6 text-lg font-semibold text-foreground">Operational Framework</p>
      <ul className="mt-3 space-y-3 text-lg leading-relaxed text-muted-foreground">
        <B label="Property Acquisition">
          Investors procure physical real estate through direct capital investment, institutional
          financing mechanisms (mortgages), or hybrid approaches combining both methods.
        </B>
        <B label="Value Generation">
          Real estate produces financial returns through two fundamental channels:
        </B>
        <li className="ml-6">
          <span className="mr-2 text-primary">·</span>
          <span className="text-foreground">Rental Income (Yield):</span> Leasing property to
          occupants generates consistent, predictable monthly revenue streams.
        </li>
        <li className="ml-6">
          <span className="mr-2 text-primary">·</span>
          <span className="text-foreground">Capital Appreciation:</span> Property and land values
          typically appreciate over extended periods due to macroeconomic factors including
          inflation, demographic expansion, market scarcity, and regional infrastructure
          advancement.
        </li>
        <B label="Property Management">
          Asset holders must maintain their investment by addressing property taxation, insurance
          obligations, maintenance requirements, and tenant administration to preserve and enhance
          market valuation.
        </B>
        <B label="Liquidation / Exit">
          Investors realize capital gains upon selling the property at a price exceeding aggregate
          acquisition and maintenance expenditures.
        </B>
      </ul>
      <p className="mt-6 text-lg font-semibold text-foreground">Illustrative Scenario</p>
      <P>
        Consider acquiring a two-bedroom apartment in an emerging suburban area for ₹50,000,000:
      </P>
      <ul className="mt-3 space-y-3 text-lg leading-relaxed text-muted-foreground">
        <B label="Down Payment & Financing">
          An initial 20% payment (₹10,000,000) is made directly, with the remaining 80% financed
          through mortgage arrangements.
        </B>
        <B label="Rental Income">
          The apartment is leased to residents at ₹25,000 monthly, with rental proceeds applied
          toward offsetting periodic loan installments.
        </B>
        <B label="Infrastructure Growth">
          Within a five-year period, metropolitan transit expansion and commercial development
          occur in proximity to the property.
        </B>
        <B label="Outcome">
          Enhanced regional demand elevates the apartment's valuation to ₹70,000,000. The proprietor
          may either maintain rental collection with anticipated increases or liquidate the asset
          to realize a ₹20,000,000 capital gain.
        </B>
      </ul>
    </>
  );
}

function IpoContent() {
  return (
    <>
      <H>What is an IPO?</H>
      <P>
        An Initial Public Offering (IPO), colloquially referred to as "going public," constitutes
        the procedural mechanism through which a privately-held enterprise makes its equity
        securities available to the general public for the inaugural time via a stock exchange.
      </P>
      <P>
        Prior to an IPO, organizational ownership remains concentrated among a restricted cohort
        of private proprietors, initial investors, and venture capital entities. An IPO
        democratizes ownership accessibility to encompass any individual or institutional
        investor.
      </P>
      <p className="mt-6 text-lg font-semibold text-foreground">Operational Framework</p>
      <ul className="mt-3 space-y-3 text-lg leading-relaxed text-muted-foreground">
        <B label="Capital Requirements for Growth">
          An expanding private enterprise necessitates substantial financial resources to reduce
          outstanding debt, finance research initiatives, scale operational capacity, or
          facilitate exit opportunities for early-stage investors.
        </B>
        <B label="Engagement of Investment Banking Institutions">
          The enterprise engages investment banking firms (underwriters) to facilitate regulatory
          documentation, conduct financial analysis, and establish an initial valuation range for
          equity securities.
        </B>
        <B label="Regulatory Compliance & Prospectus Submission">
          The enterprise submits a comprehensive prospectus (such as a DRHP) to financial market
          authorities (including SEBI or the SEC) encompassing financial statements, risk
          assessments, and capital allocation strategies.
        </B>
        <B label="Public Subscription Phase">
          The IPO becomes accessible to the public for a designated period. Both retail and
          institutional investors present bids to acquire shares at the predetermined issue price
          or within the established price band.
        </B>
        <B label="Equity Distribution & Market Commencement"></B>
        <li className="ml-6">
          <span className="mr-2 text-primary">·</span>
          <span className="text-foreground">Oversubscription & Allocation:</span> When demand
          surpasses available equity (oversubscription), allocation occurs via lottery mechanisms
          or proportional distribution methodologies.
        </li>
        <li className="ml-6">
          <span className="mr-2 text-primary">·</span>
          <span className="text-foreground">Secondary Market Trading:</span> Upon listing
          commencement, the security commences trading on the secondary market, with valuation
          determined by prevailing supply and demand dynamics.
        </li>
      </ul>
      <p className="mt-6 text-lg font-semibold text-foreground">Illustrative Case Study</p>
      <P>Consider a hypothetical technology enterprise designated CloudTech:</P>
      <ul className="mt-3 space-y-3 text-lg leading-relaxed text-muted-foreground">
        <B label="The Private Ownership Phase">
          CloudTech remains wholly owned by its two founding principals and one venture capital
          investment firm.
        </B>
        <B label="The IPO Strategy">
          To finance the construction of supplementary data infrastructure, CloudTech determines
          to procure ₹500 crore through the issuance of 10 million equity shares at ₹500 per
          share throughout a three-day public subscription interval.
        </B>
        <B label="The Investment Application">
          An investor applies for one lot comprising 30 shares valued at ₹15,000.
        </B>
        <B label="The Market Listing">
          The IPO experiences substantial investor demand and receives successful allocation. Upon
          listing commencement, robust market sentiment elevates CloudTech's equity valuation to
          ₹650 per share upon initiation of secondary market trading.
        </B>
      </ul>
    </>
  );
}

function StockExchangeContent() {
  return (
    <>
      <H>What is a Stock Exchange?</H>
      <P>
        The Stock Market constitutes a systematized marketplace—functioning through digital
        infrastructure and formal exchanges—wherein participants engage in the transaction of
        equity shares issued by publicly traded corporations.
      </P>
      <P>
        Upon acquiring a stock (alternatively termed a share or equity instrument), one obtains a
        fractional proprietary interest in the respective enterprise. Should the organization
        experience expansion and augmented profitability, the corresponding valuation of one's
        ownership position appreciates; conversely, if the business encounters adversity, the
        equity value may depreciate.
      </P>
      <p className="mt-6 text-lg font-semibold text-foreground">Operational Mechanisms</p>
      <ul className="mt-3 space-y-3 text-lg leading-relaxed text-muted-foreground">
        <B label="Initial Public Offering (IPO)">
          A privately held enterprise determines to procure capital for organizational expansion.
          It introduces newly issued shares to the general public for the inaugural occasion
          through an IPO mechanism on an established stock exchange (including the NSE/BSE or
          NYSE/Nasdaq).
        </B>
        <B label="Secondary Market Trading">
          Following the IPO, these equity instruments are subsequently exchanged freely among
          individual and institutional market participants. The exchange mechanism facilitates the
          alignment of purchasers prepared to remit a designated price (bid) with vendors prepared
          to divest at a specified price (ask).
        </B>
        <B label="Price Discovery Mechanism (Supply and Demand Dynamics)">
          Share valuations experience continuous fluctuation throughout designated trading
          intervals contingent upon supply and demand equilibrium:
        </B>
        <li className="ml-6">
          <span className="mr-2 text-primary">·</span>
          <span className="text-foreground">Preponderance of purchasers relative to vendors:</span>{" "}
          Valuation elevation.
        </li>
        <li className="ml-6">
          <span className="mr-2 text-primary">·</span>
          <span className="text-foreground">Preponderance of vendors relative to purchasers:</span>{" "}
          Valuation reduction.
        </li>
        <B label="Price Determinants">
          Investor demand derives from corporate financial disclosures, macroeconomic conditions,
          monetary policy rates, sectoral expansion trajectories, and prevailing market
          psychology.
        </B>
        <B label="Revenue Generation Mechanisms">
          Market participants accumulate financial returns through two principal methodologies:
        </B>
        <li className="ml-6">
          <span className="mr-2 text-primary">·</span>
          <span className="text-foreground">Capital Appreciation:</span> Liquidating an equity
          position at a valuation exceeding the acquisition cost.
        </li>
        <li className="ml-6">
          <span className="mr-2 text-primary">·</span>
          <span className="text-foreground">Dividend Distributions:</span> Periodic monetary
          disbursements allocated by corporations from retained earnings to equity proprietors.
        </li>
      </ul>
      <p className="mt-6 text-lg font-semibold text-foreground">Illustrative Case Study</p>
      <P>Consider a regional bakery enterprise designated FreshBakes:</P>
      <ul className="mt-3 space-y-3 text-lg leading-relaxed text-muted-foreground">
        <B label="Capital Requirements">
          FreshBakes necessitates ₹1,00,000 to establish 5 supplementary operational facilities,
          consequently subdividing the enterprise into 1,000 equity instruments valued at ₹100 per
          unit.
        </B>
        <B label="Equity Acquisition">
          An investor procures 10 shares for ₹1,000, thereby establishing a 1% proprietary stake
          in the organization.
        </B>
        <B label="Organizational Expansion">
          Throughout a twenty-four month period, the newly established facilities demonstrate
          operational success, and FreshBakes experiences a doubling of aggregate profitability.
          Market participants subsequently reassess individual share valuation at ₹250.
        </B>
        <B label="Outcome">
          The investor's 10 equity instruments attain a cumulative valuation of ₹2,500
          (10 × ₹250), realizing a capital gain of ₹1,500 alongside any dividend distributions
          disbursed during the operational period.
        </B>
      </ul>
    </>
  );
}

function RentingVsOwningContent() {
  return (
    <>
      <H>What is Renting vs. Owning?</H>
      <P>
        Within the real estate sector, leasehold properties (rental/investment-based) and freehold
        properties (owner-occupied/self-owned) constitute two fundamentally distinct methodologies
        for utilizing or generating returns from physical real estate assets.
      </P>
      <P>
        The fundamental distinction centers on the dichotomy between ownership and utilization:
        leasing arrangements confer temporary occupancy privileges without conferring ownership
        rights, whereas property ownership grants complete legal title and accumulated equity in
        the underlying asset.
      </P>
      <p className="mt-6 text-lg font-semibold text-foreground">Operational Mechanisms</p>
      <ul className="mt-3 space-y-3 text-lg leading-relaxed text-muted-foreground">
        <B label="Leasehold Properties">
          A tenant executes a lease contract with a property owner, remitting consistent monthly
          rental payments in return for occupancy entitlements. The tenant accumulates no equity,
          incurs no exposure to market depreciation, and bears no obligation for substantial
          structural maintenance.
        </B>
        <B label="Freehold Properties">
          The proprietor obtains legal ownership of the property (through outright acquisition or
          mortgage financing). The owner maintains equity in the asset, realizes direct benefits
          from appreciation in property valuation, yet assumes responsibility for property
          taxation, ongoing maintenance obligations, and market-related risks.
        </B>
      </ul>
      <p className="mt-6 text-lg font-semibold text-foreground">Principal Distinctions</p>
      <ul className="mt-3 space-y-3 text-lg leading-relaxed text-muted-foreground">
        <B label="Economic Classification">
          Leasing constitutes a recurring monthly expenditure, whereas property ownership
          functions as an equity-accumulating investment vehicle.
        </B>
        <B label="Initial Investment Requirements">
          Leasing necessitates minimal upfront capital (security deposit and initial monthly
          rent), while property ownership demands substantial initial expenditures including down
          payments, transfer taxes, and administrative registration charges.
        </B>
        <B label="Relocation Capacity">
          Leasing provides substantial flexibility for residential mobility upon lease
          termination, whereas property ownership complicates relocation due to the extended
          timeframes required for property disposition or tenant placement.
        </B>
        <B label="Capital Appreciation">
          Leasing generates no financial gains for the occupant, whereas property ownership
          facilitates wealth accumulation through sustained property value appreciation.
        </B>
        <B label="Structural Modifications">
          Leasing arrangements impose stringent limitations on property alterations, whereas
          ownership permits unrestricted authority to undertake renovations or comprehensive
          redesign initiatives.
        </B>
      </ul>
      <p className="mt-6 text-lg font-semibold text-foreground">Illustrative Scenario</p>
      <P>
        Consider two colleagues, Rohan and Priya, occupying comparable residential units valued at
        ₹50,000,000:
      </P>
      <ul className="mt-3 space-y-3 text-lg leading-relaxed text-muted-foreground">
        <B label="Rohan's Leasehold Arrangement">
          He remits ₹25,000 monthly to the property proprietor. Should his professional obligations
          necessitate relocation to an alternative metropolitan area within the subsequent year, he
          provides one month's notice and transitions without encumbrance regarding property
          disposition. Conversely, following a five-year occupancy period, his cumulative rental
          disbursements exceed ₹15,00,000 with zero corresponding equity accumulation.
        </B>
        <B label="Priya's Freehold Ownership">
          She secures a mortgage, providing a ₹10,000,000 down payment alongside monthly EMI
          payments. Over the same five-year period, while assuming maintenance and taxation
          liabilities, every payment progressively increases her equity ownership in the
          property—benefiting directly from any regional property appreciation.
        </B>
      </ul>
    </>
  );
}

function GenericContent({ lesson }: { lesson: LessonInfo }) {
  return (
    <>
      <H>Overview</H>
      <P>{lesson.summary}</P>
      <H>What you'll learn</H>
      <P>
        This lesson walks through the core ideas step by step, with practical examples in Indian
        Rupees. Full content for this lesson is coming soon.
      </P>
    </>
  );
}

export function LessonModal({ lesson, onClose }: { lesson: LessonInfo | null; onClose: () => void }) {
  useEffect(() => {
    if (!lesson) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lesson, onClose]);

  if (!lesson) return null;
  const isSip = lesson.title === "SIP Basics";
  const title = isSip ? "SIP Basics: Mechanics & Rupee-Cost Averaging" : lesson.title;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-[85vh] w-full max-w-[850px] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative flex items-center gap-3 border-b border-border px-6 py-4">
          <span className="mono-label rounded-full border border-border px-3 py-1 text-muted-foreground">
            <span className="text-primary">•</span> {lesson.category}
          </span>
          <span className="mono-label rounded-full bg-primary/15 px-3 py-1 text-primary">
            {lesson.level}
          </span>
          <span className="mono-label text-muted-foreground">{lesson.minutes} min</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lesson"
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="relative flex-1 overflow-y-auto px-6 py-8 sm:px-10">
          <h2 className="text-4xl leading-tight sm:text-5xl">{title}</h2>
          <div className="mt-6 rounded-xl border border-primary/40 bg-primary/10 p-5">
            <p className="mono-label text-primary">Summary</p>
            <p className="mt-2 text-lg leading-relaxed text-foreground">{lesson.summary}</p>
          </div>
          {isSip ? (
            <SipContent />
          ) : lesson.title === "How Mutual Funds Work" ? (
            <MfContent />
          ) : lesson.title === "Real Estate Fundamentals" ? (
            <RealEstateContent />
          ) : lesson.title === "Build an Emergency Fund" ? (
            <IpoContent />
          ) : lesson.title === "Index Funds & Diversification" ? (
            <StockExchangeContent />
          ) : lesson.title === "Rental Yield & Cash Flow" ? (
            <RentingVsOwningContent />
          ) : (
            <GenericContent lesson={lesson} />
          )}
        </div>
      </div>
    </div>
  );
}
