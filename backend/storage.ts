import { users, preBookings, abTestResults, type User, type InsertUser, type PreBooking, type InsertPreBooking, type AbTestResult, type InsertAbTestResult } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createPreBooking(preBooking: InsertPreBooking): Promise<PreBooking>;
  getPreBookingByEmail(email: string): Promise<PreBooking | undefined>;
  getPreBookingsCount(): Promise<number>;
  getAllPreBookings(): Promise<PreBooking[]>;
  
  // A/B Testing methods
  recordView(variant: string): Promise<void>;
  recordConversion(variant: string): Promise<void>;
  getAbTestResults(): Promise<AbTestResult[]>;
  getAbTestResultsByDate(date: string): Promise<AbTestResult[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private preBookings: Map<number, PreBooking>;
  private abTestData: Map<number, AbTestResult>;
  private currentUserId: number;
  private currentPreBookingId: number;
  private currentAbTestId: number;

  constructor() {
    this.users = new Map();
    this.preBookings = new Map();
    this.abTestData = new Map();
    this.currentUserId = 1;
    this.currentPreBookingId = 1;
    this.currentAbTestId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createPreBooking(insertPreBooking: InsertPreBooking): Promise<PreBooking> {
    const id = this.currentPreBookingId++;
    const preBooking: PreBooking = { 
      id,
      firstName: insertPreBooking.firstName,
      lastName: insertPreBooking.lastName,
      email: insertPreBooking.email,
      company: insertPreBooking.company || null,
      platforms: insertPreBooking.platforms || null,
      termsAccepted: insertPreBooking.termsAccepted,
      variant: insertPreBooking.variant || "A",
      createdAt: new Date()
    };
    this.preBookings.set(id, preBooking);
    return preBooking;
  }

  async getPreBookingByEmail(email: string): Promise<PreBooking | undefined> {
    return Array.from(this.preBookings.values()).find(
      (booking) => booking.email === email,
    );
  }

  async getPreBookingsCount(): Promise<number> {
    return this.preBookings.size;
  }

  async getAllPreBookings(): Promise<PreBooking[]> {
    return Array.from(this.preBookings.values());
  }

  // A/B Testing methods
  async recordView(variant: string): Promise<void> {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const existingRecord = Array.from(this.abTestData.values()).find(
      record => record.variant === variant && record.date === today
    );

    if (existingRecord) {
      existingRecord.views += 1;
    } else {
      const id = this.currentAbTestId++;
      const newRecord: AbTestResult = {
        id,
        variant,
        views: 1,
        conversions: 0,
        date: today,
        createdAt: new Date()
      };
      this.abTestData.set(id, newRecord);
    }
  }

  async recordConversion(variant: string): Promise<void> {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const existingRecord = Array.from(this.abTestData.values()).find(
      record => record.variant === variant && record.date === today
    );

    if (existingRecord) {
      existingRecord.conversions += 1;
    } else {
      const id = this.currentAbTestId++;
      const newRecord: AbTestResult = {
        id,
        variant,
        views: 0,
        conversions: 1,
        date: today,
        createdAt: new Date()
      };
      this.abTestData.set(id, newRecord);
    }
  }

  async getAbTestResults(): Promise<AbTestResult[]> {
    return Array.from(this.abTestData.values());
  }

  async getAbTestResultsByDate(date: string): Promise<AbTestResult[]> {
    return Array.from(this.abTestData.values()).filter(record => record.date === date);
  }
}

export const storage = new MemStorage();
