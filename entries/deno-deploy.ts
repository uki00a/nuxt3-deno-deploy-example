/**
 * Based on https://github.com/nuxt/framework/blob/7776452061d1aae19247c305d11e955c05f73f48/packages/nitro/src/runtime/entries/cloudflare.ts which is licensed as follows:
 *
 * MIT License
 *
 * Copyright (c) 2016-present Nuxt Team
 * - Sebastien Chopin ([@Atinux](https://github.com/Atinux))
 * - Alexandre Chopin ([@alexchopin](https://github.com/alexchopin))
 * - Pooya Parsa ([@pi0](https://github.com/pi0))
 * - Clark Du ([@clarkdo](https://github.com/clarkdo))
 * - Jonas Galvez ([@galvez](https://github.com/galvez))
 * - Alexander Lichter ([@manniL](https://github.com/manniL))
 * - Dmitry Molotkov ([@aldarund](https://github.com/aldarund))
 * - Kevin Marrec ([@kevinmarrec](https://github.com/kevinmarrec))
 * - Pim ([@pimlie](https://github.com/pimlie))
 * - All the amazing contributors (https://github.com/nuxt/nuxt.js/graphs/contributors)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// @ts-expect-error
import { serve } from "https://deno.land/std@0.125.0/http/server.ts";
import { localCall } from "@nuxt/nitro/dist/runtime/server/index.mjs";
import {
  requestHasBody,
  useRequestBody,
} from "@nuxt/nitro/dist/runtime/server/utils.mjs";

serve(async (req: Request) => {
  let body: any;
  if (requestHasBody(req)) {
    body = await useRequestBody(req);
  }
  const url = new URL(req.url);
  const ctx = {
    url: url.pathname + url.search,
    host: url.hostname,
    protocol: url.protocol,
    headers: req.headers,
    method: req.method,
    redirect: req.redirect,
    body,
  };
  const r = await localCall(ctx);

  console.log(ctx)
  console.log([req.url, r])
  return new Response(r.body, {
    headers: r.headers,
    status: r.status,
    statusText: r.statusText,
  });
});

const isLocal = Deno.env.get("DENO_DEPLOYMENT_ID") == null;
if (isLocal) {
  console.log("Listening on http://localhost:8000");
}
