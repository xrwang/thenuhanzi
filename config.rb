# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

set :images_dir, 'assets/images'
set :js_dir, 'javascripts'


activate :relative_assets
set :relative_links, true

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

# helpers do
#   def some_helper
#     'Helping'
#   end
# end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

# configure :build do
#   activate :minify_css
#   activate :minify_javascript
# end

activate :livereload
activate :directory_indexes


# Middleman-deploy configuration
activate :deploy do |deploy|
  deploy.deploy_method = :git
  deploy.remote = 'git@github.com:xrwang/thenuhanzi.git'
  deploy.branch = 'gh-pages'
  deploy.build_before = true
end

# activate :toolkit do |toolkit|
#   # toolkit.prefix = "toolkit"
#   toolkit.permalink = ":toolkit.html"
# end


page "index.html", :layout => "landing"

page "fom-game.html", :layout => "game"

page "toolkit/*", :layout => "toolkit"

page "homophone-search/*", :layout => "homophone-search"


set :fonts_dir,  'fonts'

helpers do
  def radical_svg_path(id)
    image_path("radicals/radical-#{id}.svg")
  end

  def word_svg_path(id)
    image_path("words/#{id}.svg")
  end
end
