"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronRight, Plus, Minus } from "lucide-react";

// 패널 헤더 컴포넌트
interface PanelHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export function PanelHeader({
  title,
  icon,
  actions,
  collapsible = false,
  defaultExpanded = true,
  className,
  ...props
}: PanelHeaderProps) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 border-b border-border",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        {collapsible && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-4 w-4 p-0 hover:bg-transparent"
          >
            {isExpanded ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </Button>
        )}
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      {actions && <div className="flex items-center gap-1">{actions}</div>}
    </div>
  );
}

// 패널 컨텐츠 컴포넌트
interface PanelContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PanelContent({
  children,
  className,
  ...props
}: PanelContentProps) {
  return (
    <div className={cn("p-3", className)} {...props}>
      {children}
    </div>
  );
}

// 패널 그룹 컴포넌트
interface PanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}

export function PanelGroup({
  title,
  icon,
  actions,
  collapsible = false,
  defaultExpanded = true,
  children,
  className,
  ...props
}: PanelGroupProps) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  return (
    <div
      className={cn("border-b border-border last:border-b-0", className)}
      {...props}
    >
      <div
        className={cn(
          "flex items-center justify-between p-2 cursor-pointer hover:bg-accent/50",
          collapsible && "cursor-pointer"
        )}
        onClick={() => collapsible && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          {collapsible && (
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
            >
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </Button>
          )}
          {icon && <span className="text-muted-foreground">{icon}</span>}
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {title}
          </span>
        </div>
        {actions && <div className="flex items-center gap-1">{actions}</div>}
      </div>
      {isExpanded && <div className="p-2 space-y-2">{children}</div>}
    </div>
  );
}

// 속성 필드 컴포넌트들
interface PropertyFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
  unit?: string;
}

export function PropertyField({
  label,
  value,
  onChange,
  step = 0.1,
  min,
  max,
  unit,
}: PropertyFieldProps) {
  return (
    <div className="flex items-center justify-between py-1">
      <Label className="text-xs text-muted-foreground w-16">{label}</Label>
      <div className="flex items-center gap-1">
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          step={step}
          min={min}
          max={max}
          className="w-20 h-6 text-xs"
        />
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>
    </div>
  );
}

interface ColorFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorField({ label, value, onChange }: ColorFieldProps) {
  return (
    <div className="flex items-center justify-between py-1">
      <Label className="text-xs text-muted-foreground w-16">{label}</Label>
      <div className="flex items-center gap-2">
        <Input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-6 p-0 border-0"
        />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-16 h-6 text-xs"
        />
      </div>
    </div>
  );
}

interface Vector3FieldProps {
  label: string;
  value: [number, number, number];
  onChange: (value: [number, number, number]) => void;
  step?: number;
  min?: number;
  max?: number;
}

export function Vector3Field({
  label,
  value,
  onChange,
  step = 0.1,
  min,
  max,
}: Vector3FieldProps) {
  const updateValue = (index: number, newValue: number) => {
    const newVector: [number, number, number] = [...value] as [
      number,
      number,
      number
    ];
    newVector[index] = newValue;
    onChange(newVector);
  };

  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="grid grid-cols-3 gap-1">
        <PropertyField
          label="X"
          value={value[0]}
          onChange={(value) => updateValue(0, value)}
          step={step}
          min={min}
          max={max}
        />
        <PropertyField
          label="Y"
          value={value[1]}
          onChange={(value) => updateValue(1, value)}
          step={step}
          min={min}
          max={max}
        />
        <PropertyField
          label="Z"
          value={value[2]}
          onChange={(value) => updateValue(2, value)}
          step={step}
          min={min}
          max={max}
        />
      </div>
    </div>
  );
}

interface BooleanFieldProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function BooleanField({ label, value, onChange }: BooleanFieldProps) {
  return (
    <div className="flex items-center justify-between py-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Button
        variant={value ? "default" : "outline"}
        size="sm"
        onClick={() => onChange(!value)}
        className="h-6 px-2 text-xs"
      >
        {value ? "On" : "Off"}
      </Button>
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

export function SelectField({
  label,
  value,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <div className="flex items-center justify-between py-1">
      <Label className="text-xs text-muted-foreground w-16">{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-20 h-6 text-xs border border-input bg-background rounded px-1"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// 메인 패널 컴포넌트
interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "sidebar";
}

export function Panel({
  children,
  variant = "default",
  className,
  ...props
}: PanelProps) {
  return (
    <div
      className={cn(
        "bg-background border-border",
        variant === "sidebar" ? "border-r" : "border",
        "flex flex-col",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// 패널 컨테이너 (여러 패널을 관리)
interface PanelContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
}

export function PanelContainer({
  children,
  orientation = "horizontal",
  className,
  ...props
}: PanelContainerProps) {
  return (
    <div
      className={cn(
        "flex",
        orientation === "horizontal" ? "flex-row" : "flex-col",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
