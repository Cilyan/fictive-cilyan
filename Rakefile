require "gettext/tools"
require 'sass'

directory "dist"
directory "dist/language"

desc "Compile SCSS to CSS"
task :scss => ["dist"] do
  FileList["src/scss/[^_]*.scss"].each do |scss_file|
    basename = scss_file[9..-6]
    css_filename = "dist/#{basename}.css"
    unless uptodate?(css_filename, scss_file)
      puts "sass #{basename}.css"
      engine = Sass::Engine.new(
        open(scss_file).read,
        :filename => scss_file,
        :style => "expanded",
        :syntax => :scss,
        :css_filename => css_filename
      )
      target_dir = "compiled_examples/#{basename.sub(%r{/[^/]*$},'')}"
      output = open(css_filename,'w')
      output.write(engine.render)
      output.close
    end
  end
end

desc "Clean distribution directory"
task :clean do
  rm_rf "dist"
end

desc "Compile translations"
task :makemo => ["dist/language"] do
  FileList["src/languages/*.po"].each do |po_file|
    basename = po_file[14..-4]
    mo_file = "dist/language/#{basename}.mo"
    unless uptodate?(mo_file, po_file)
      puts "msgfmt #{basename}.mo"
      GetText::Tools::MsgFmt.run(po_file, "--output", mo_file)
    end
  end
end

desc "Install php files"
task :installphp => ["dist"]do
  cp_r("src/php/.", "dist")
end

desc "Install JS files"
task :installjs => ["dist"]do
  cp_r("src/js", "dist")
end

desc "Install images"
task :installimages => ["dist"]do
  cp_r("src/images", "dist")
end

desc "Install documentation"
task :installdocs => ["dist"]do
  cp_r("src/doc/.", "dist")
end

desc "Install fonts"
task :installfonts => ["dist"]do
  cp_r("src/font-awesome/fonts", "dist")
end

desc "Build dist directory"
task :builddist => [:scss, :makemo, :installphp, :installjs, :installimages, :installfonts, :installdocs]
