require "gettext/tools"
require 'sass'

name = "fictive-cilyan"
version = "0.2.0"

distdir = "dist"
target = "#{distdir}/#{name}"

directory target
directory "#{target}/language"

desc "Clean release directory"
task :clean do
  rm_rf target
end

desc "Revert repository to original state"
task :clobber => [:clean] do
  rm_rf distdir
end

desc "Compile SCSS to CSS in release dir"
task :releasecss => [target] do
  scss_files = FileList["src/scss/*.scss"]
  FileList["src/scss/[^_]*.scss"].each do |scss_file|
    basename = scss_file[9..-6]
    css_filename = "#{target}/#{basename}.css"
    unless uptodate?(css_filename, scss_files)
      puts "sass #{basename}.css"
      # Substitute version number if necessary
      indata = open(scss_file).read.sub("@@version@@", version)
      engine = Sass::Engine.new(
        indata,
        :filename => scss_file,
        :style => "expanded",
        :syntax => :scss,
        :css_filename => css_filename
      )
      output = open(css_filename,'w')
      output.write(engine.render)
      output.close
    end
  end
end

desc "Compile translations in release dir"
task :releasetranslate => ["#{target}/language"] do
  FileList["src/languages/*.po"].each do |po_file|
    basename = po_file[14..-4]
    mo_file = "#{target}/language/#{basename}.mo"
    unless uptodate?(mo_file, [po_file])
      puts "msgfmt #{basename}.mo"
      GetText::Tools::MsgFmt.run(po_file, "--output", mo_file)
    end
  end
end

desc "Install php files in relase dir"
task :releasephp => [target] do
  cp_r("src/php/.", target)
end

desc "Install JS files in relase dir"
task :releasejs => [target] do
  cp_r("src/js", target)
end

desc "Install images in relase dir"
task :releaseimages => [target] do
  cp_r("src/images", target)
end

desc "Install documentation in relase dir"
task :releasedocs => [target] do
  cp_r("src/doc/.", target)
end

desc "Install fonts in relase dir"
task :releasefonts => [target] do
  cp_r("src/font-awesome/fonts", target)
end

desc "Create release directory in #{distdir}"
task :release => [
  :releasecss, :releasetranslate, :releasephp, :releasejs,
  :releaseimages, :releasefonts, :releasedocs
]

# Would be better using Rake::PackageTask but at the moment I'm
# unable to configure it properly.
desc "Build release package"
task :build => [:release] do
  sh("cd #{distdir} && 7z a -tzip #{name}-#{version}.zip #{name}")
  puts "Release is ready: #{distdir}/#{name}-#{version}.zip"
end

task :default => :build
