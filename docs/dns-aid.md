# DNS for AI Discovery (DNS-AID)

> **Status: not yet published — requires DNS-zone changes, which cannot live in
> this repo.** This file documents the records to add at the DNS provider for
> `thegrandlb.com`.

DNS-AID
([draft-mozleywilliams-dnsop-dnsaid](https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/))
lets agents discover entrypoints via DNS using ServiceMode SVCB/HTTPS records
([RFC 9460](https://www.rfc-editor.org/rfc/rfc9460)) under the
`_agents` subtree.

This site's agent surface is HTTPS-based (the API catalog, OpenAPI, menus API,
and Markdown content negotiation — all under `https://thegrandlb.com`). The
matching DNS-AID entrypoint record advertises that HTTPS endpoint.

## Records to add

Publish a ServiceMode SVCB record at the well-known agent index name. Replace
TTLs/priorities to match the zone's conventions.

```dns
; Index entrypoint for agent discovery over HTTPS
_index._agents.thegrandlb.com.  3600  IN  SVCB  1 thegrandlb.com. (
    alpn="h2,h3"
    port=443
)

; Optional: advertise the API catalog path as the discovery endpoint.
; Some resolvers/clients read the "endpoint"/"dohpath"-style params; if the
; provider supports the generic key for a path, point it at the catalog:
;   _index._agents.thegrandlb.com. SVCB 1 thegrandlb.com. ( alpn="h2,h3" )
```

If/when an A2A (agent-to-agent) endpoint exists, add:

```dns
_a2a._agents.thegrandlb.com.  3600  IN  SVCB  1 thegrandlb.com. ( alpn="h2,h3" )
```

## DNSSEC

Sign the public discovery zone with DNSSEC so validating resolvers receive
authenticated answers. On most managed DNS providers (Cloudflare, Route 53,
etc.) this is a one-click "Enable DNSSEC" toggle plus adding the resulting DS
record at the registrar.

## Verify

```bash
dig +dnssec SVCB _index._agents.thegrandlb.com
```

Confirm an `SVCB` answer is returned and that the `ad` (authenticated data)
flag is set when querying through a validating resolver.
