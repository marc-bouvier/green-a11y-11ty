---
title: "Découpage du making-of en articles"
date: 2024-09-24T17:48:44+02:00
description: ""
tags:
  - 11ty
cover_image: "/public/img/cover_images/decoupage-de-la-mise-en-page.png"
---


Index: making-of.html
```diff
+---
+layout: "default.html"
+title: "Making of"
+---
+<p>
+    Dans cette série d'articles, je relate comment je construis ce site au fur et à mesure.
+    Je tenterai de le faire évoluer en utilisant la technique des petits pas.
+    C'est à dire : une chose à la fois.
+    En expliquant autant que je peux dans un langage clair ce que je fais et les raisons de mes actions.
+</p>
+
+<ul>
+    {% for making-of in collections.making-of %}
+    <li style="display: flex;border-bottom: darkgray dotted 1px;    justify-content: space-between;">
+        <a href="{{making-of.url}}" style="text-decoration: none; flex-grow:1;">{{ making-of.data.title }}</a>
+        <time datetime="{{making-of.data.date}}" style="font-family: monospace;">
+            {{ making-of.data.date | toLocaleStringFrShort }}
+        </time>
+    </li>
+    {% endfor %}
+</ul>
+
+<hr/>
+
+<a href="/TODO">Prochaines étapes possibles</a>
```

Index: making-of/making-of.json
```diff
+{
+  "layout": "default.html",
+  "tags": "making-of"
+
+}
```

