import React from 'react';
import clsx from 'clsx';
import { Card, CardContent } from './Card';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import './StatCard.css';

export function StatCard({ title, value, trend, target, className }) {
  const isPositive = trend && trend.value > 0;
  const isNegative = trend && trend.value < 0;
  
  const TrendIcon = isPositive ? ArrowUpRight : (isNegative ? ArrowDownRight : Minus);

  return (
    <Card className={clsx('stat-card', className)}>
      <CardContent className="stat-card-content">
        <h3 className="stat-card-title">{title}</h3>
        <div className="stat-card-body">
          <div className="stat-card-value">{value}</div>
          {trend && (
            <div className="stat-card-trend-wrapper">
              <span className={clsx('stat-card-trend-badge', {
                'trend-positive': isPositive,
                'trend-negative': isNegative,
                'trend-neutral': !isPositive && !isNegative
              })}>
                <TrendIcon size={14} className="mr-1" />
                {trend.value > 0 ? '+' : (trend.value < 0 ? '-' : '')}{Math.abs(trend.value)}%
              </span>
              {trend.label && <span className="stat-card-trend-label">{trend.label}</span>}
            </div>
          )}
          {target && (
            <div className="stat-card-target">
              Target: {target}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
