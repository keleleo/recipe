export class FuctionCache<T> {
  method: () => T;
  delay: number;

  cachedData: T | null = null;
  lastUpdate: number = 0;

  updatePromise: Promise<void> | null = null;

  constructor(method: () => T, delay: number) {
    this.method = method
    this.delay = delay
  }

  verifyUpdateTime() {
    return (this.lastUpdate + this.delay) > Date.now();
  }
  async updateData() {
    if (this.updatePromise) {
      await this.updatePromise;
      return;
    }
    if (this.verifyUpdateTime()) return;
    this.updatePromise = (async () => {
      try {
        if (this.verifyUpdateTime()) return;
        const data = await this.method();
        this.cachedData = data;
      } catch (ex) {
        console.error("Error on update data:", ex);
      } finally {
        this.lastUpdate = Date.now()
        this.updatePromise = null;
      }
    })();
    await this.updatePromise;
  }

  public async getData() {
    if (!this.cachedData) {
      await this.updateData();
    } else {
      this.updateData();
    }
    return this.cachedData;
  }
}