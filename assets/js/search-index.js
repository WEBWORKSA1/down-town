---
layout: null
---
/* Site search index, generated from every page's front matter at build time */
window.DT_SEARCH=[{% assign first = true %}{% for p in site.pages %}{% if p.title and p.noindex != true and p.search != false %}{% if p.url contains ".html" or p.url == "/" or p.url == "/explore/" or p.url == "/live/" or p.url == "/space/" or p.url == "/business/" or p.url == "/tools/" %}{% assign sec = site.data.sections | where: "key", p.section | first %}{% assign pc = site.data.cities | where: "slug", p.city | first %}{% unless first %},{% endunless %}{% assign first = false %}{"t":{{ p.title | jsonify }},"u":{{ p.url | remove_first: "/" | jsonify }},"d":{{ p.description | truncate: 120 | jsonify }},"k":"{% if sec %}{{ sec.line }}{% else %}d{% endif %}","x":{% if pc %}{{ pc.country | append: " " | append: pc.district | append: " " | append: pc.region | jsonify }}{% else %}{{ p.section | default: "" | jsonify }}{% endif %}}{% endif %}{% endif %}{% endfor %}];
