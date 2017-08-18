###
# Page options, layouts, aliases and proxies
###
require 'json'

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false
page '/paste.html', layout: false


# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration

activate :directory_indexes

activate :asset_hash
activate :relative_assets
set :relative_links, true

activate :external_pipeline,
  name: :webpack,
  command: build? ? 'npm run-script build' : 'npm run-script dev',
  source: ".tmp/dist",
  latency: 1

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

###
# Helpers
###

# Methods defined in the helpers block are available in templates
helpers do
  def nav_link_to(body, url, options = {})
    options[:class] = 'nav-link'
    options[:onclick] = "ga('send', 'event', 'navigation_topic_link', 'click', '#{url}')"
    link_to(body, url, options)
  end
end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript
end
