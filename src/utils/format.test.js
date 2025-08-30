// Tests for format utility functions
import { describe, it, expect } from 'vitest'
import { fmtMag, fmtDepth } from './format'

describe('format utils', () => {
  // Test magnitude formatting with decimal places and null handling
  it('formats magnitude with one decimal and handles null', () => {
    expect(fmtMag(4.123)).toBe('4.1')
    expect(fmtMag(null)).toBe('N/A')
  })

  // Test magnitude formatting with integers and undefined values
  it('handles integer and undefined magnitudes', () => {
    expect(fmtMag(5)).toBe('5.0')
    expect(fmtMag(undefined)).toBe('N/A')
  })

  // Test depth formatting with decimal places and undefined handling
  it('formats depth with one decimal and handles undefined', () => {
    expect(fmtDepth(12.345)).toBe('12.3 km')
    expect(fmtDepth(undefined)).toBe('—')
  })

  // Test edge cases for depth formatting
  it('formats edge depths (0 and negative numbers) without throwing', () => {
    expect(fmtDepth(0)).toBe('0.0 km')
    expect(fmtDepth(-1)).toBe('-1.0 km')
  })
})
