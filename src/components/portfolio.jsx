"use client"

import { PortfolioCard } from "./portfolio/portfolioCard";
import { useAtom } from "jotai";
import { portfolioAtom } from "@/components/Atom/portfolioAtom";

export const Portfolio = ({ listPortfolio }) => {
  const [portfolioData, setPortfolioData] = useAtom(portfolioAtom);
  setPortfolioData(listPortfolio);
  return (
    <div>
      <div className="portfolio-card-wrapper">
        <PortfolioCard />
      </div>
    </div>
  );
};
