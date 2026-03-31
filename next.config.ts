import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import type { RuleSetRule } from "webpack";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true"
});

const nextConfig: NextConfig = {
  reactCompiler: true,
  htmlLimitedBots: /.*/,

  // 1. ADD THE REWRITE HERE
  async rewrites() {
    return [
      {
        // When you call '/api-proxy/login', it goes here:
        source: '/api-proxy/:path*',
        destination: 'http://187.77.23.76/api/v1/:path*',
      },
    ];
  },

  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: { typescript: true, icon: true, titleProp: true, svgo: true, prettier: false }
          }
        ],
        as: "*.js"
      }
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "http",
        hostname: "10.10.7.111",
        port: "4000",
        pathname: "/**"
      },
      // Added your dev IP here just in case you need to load images from it too
      {
        protocol: "http",
        hostname: "187.77.23.76",
        port: "",
        pathname: "/**"
      }
    ]
  },
  webpack(config) {
    const rules = config.module.rules as RuleSetRule[];
    const fileLoaderRule = rules.find(
      (rule): rule is RuleSetRule =>
        !!rule && typeof rule === "object" && rule.test instanceof RegExp && rule.test.test(".svg")
    );
    if (fileLoaderRule) fileLoaderRule.exclude = /\.svg$/i;
    config.module.rules.push({ test: /\.svg$/i, issuer: /\.[jt]sx?$/, use: ["@svgr/webpack"] });
    return config;
  }
};

export default withBundleAnalyzer(nextConfig);