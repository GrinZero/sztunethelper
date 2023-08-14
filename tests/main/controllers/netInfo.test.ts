import {
  getCurrentNetInfo,
  ping,
  tracert,
  ifconfig,
  netstat,
  arp,
} from "@controllers/netInfo/index";

import { it, expect, describe } from "vitest";

it("getCurrentNetInfo", async () => {
  const result = await getCurrentNetInfo();
  expect(result).not.toBe(null);
  expect(result?.dhcp).toBeTypeOf("boolean");
  expect(result?.mac).toBeTypeOf("string");
  expect(result?.ipv4).toHaveProperty("address");
  expect(result?.ipv4).toHaveProperty("netmask");
  expect(result?.dnsServer).not.toHaveLength(0);
});

// it('getPublicIP', async () => {
//   expect(await getPublicIP()).not.toBe(null)
// })

it("ping 114.114.114.114: 检测外网网络", async () => {
  const result = await ping("114.114.114.114");
  expect(result).toContain("PING 114.114.114.114 (114.114.114.114)");
});

describe("net command", () => {
  it.concurrent(
    "tracert 47.98.217.40",
    async () => {
      const result = await tracert("47.98.217.40");
      expect(result).toContain("47.98.217.40");
    },
    7000
  );

  it.concurrent("ifconfig", async () => {
    const result = await ifconfig();
    expect(result).not.toBe(null);
  });

  it.concurrent("netstat -a", async () => {
    const result = await netstat();
    expect(result).not.toBe(null);
  });

  it.concurrent("arp -a", async () => {
    const result = await arp();
    expect(result).not.toBe(null);
  });
});
