import { Head as _Head } from "$fresh/runtime.ts"

export function Head() {
  return (
    <_Head>
      <title>Capi Multisig Util</title>
      <meta
        name="description"
        content="Easily manage your tokens and assets with multiple levels of security and approvals."
      />
      <meta property="og:title" content="Capi Multisig Util" />
      <meta
        property="og:description"
        content="A secure and user-friendly multisig app for the Polkadot network."
      />
      <meta property="og:site_name" content="Capi Multisig Util" />
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      {/* TODO Make sure it property contains the actual URL */}
      <meta property="og:url" content="http://www.example.com" />
      <meta
        property="og:image"
        content="https://pbs.twimg.com/profile_banners/1595615893/1657020030/1500x500"
      />
      <meta property="og:image:width" content="1500" />
      <meta property="og:image:height" content="500" />
    </_Head>
  )
}
