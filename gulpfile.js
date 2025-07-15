const gulp = require('gulp')
const fs = require('fs')
const del = require('del')
const replace = require('gulp-replace')
const rename = require('gulp-rename')
const zip = require('gulp-zip')
const UglifyJS = require('uglify-js')
const XEUtils = require('xe-utils')

const enableAd = true
const enableSponsors = true

// 是否启用强制广告
const isForceAd = false

const adVariable = {
  VXE_AD_WRAPPER_ID: XEUtils.sample('qazxswedcvfrtgbnhyujmkiolp0123456789'.split(''), 18).join(''),
  VXE_AD_WRAPPER_STYLE: `position: fixed !important;right: 20px !important;top: ${XEUtils.sample([60, 80, 100, 120, 140])}px !important;width: 240px !important;padding: 0 !important;margin: 0 !important;z-index: 99 !important;display: block !important;text-align: left !important;`,
  VXE_AD_SPONSOR_ID: XEUtils.sample('qazxswedcvfrtgbnhyujmkiolp0123456789'.split(''), 16).join(''),
  VXE_AD_WWADS_STYLE: 'max-width: 200px !important;;visibility: visible !important;display: block !important;'
}

// 赞助商
const ssTmpJS = UglifyJS.minify(XEUtils.toFormatString(fs.readFileSync('./ad/ssTmpl.js', 'utf-8'), adVariable), {
  toplevel: true,
  output: {
    beautify: false
  }
})
const ssTmplScript = `<script>(function(){${ssTmpJS.code}})()</script>`
const sponsorsJS = UglifyJS.minify(XEUtils.toFormatString(fs.readFileSync('./ad/sponsors.js', 'utf-8'), adVariable), {
  toplevel: true,
  output: {
    beautify: false
  }
})
const sponsorsTmplScript = `<script>(function(){${sponsorsJS.code}})()</script>`

// 广告位
const adTmpJS = UglifyJS.minify(XEUtils.toFormatString(fs.readFileSync('./ad/adTmpl.js', 'utf-8'), adVariable), {
  toplevel: true,
  output: {
    beautify: false
  }
})
const adTmplScript = `<script>(function(){${adTmpJS.code}})()</script>`
const adCheckJS = UglifyJS.minify(XEUtils.toFormatString(fs.readFileSync('./ad/check.js', 'utf-8'), adVariable), {
  toplevel: true,
  output: {
    beautify: false
  }
})
const adCheckScript = `<script>${adCheckJS.code}</script>`
const adScript = `<script data-mode="hash" type="text/javascript" charset="UTF-8" src="https://cdn.wwads.cn/js/makemoney.js" async></script>`

// 访问数量统计
const tjTmpJS = UglifyJS.minify(XEUtils.toFormatString(fs.readFileSync('./ad/tjTmpl.js', 'utf-8'), adVariable), {
  toplevel: true,
  output: {
    beautify: false
  }
})
const hmScript = `<script>${tjTmpJS.code}</script>`

gulp.task('clear_docs_temp', () => {
  return del([
    '_temp',
    'docs',
    'docs.zip'
  ], { force: true })
})

gulp.task('copy_v3_temp', () => {
  return gulp.src('v3/dist/**')
    .pipe(gulp.dest('_temp/xe-utils'))
})
gulp.task('copy_v3_index', gulp.series('copy_v3_temp', () => {
  return gulp.src('v3/dist/index.html')
    .pipe(replace('</head>', enableAd ? `${adScript}${isForceAd ? adCheckScript : ''}</head>`: '</head>'))
    .pipe(replace('</body>', `${enableSponsors ? ssTmplScript : ''}${ enableSponsors ? sponsorsTmplScript : ''}${enableAd ? adTmplScript : ''}</body>`))
    .pipe(gulp.dest('_temp/xe-utils'))
    .pipe(rename({
      basename: '404'
    }))
    .pipe(gulp.dest('_temp/xe-utils'))
}))
gulp.task('copy_v3_docs', gulp.series('copy_v3_index', () => {
  return gulp.src('_temp/xe-utils/**')
    .pipe(gulp.dest('docs/xe-utils'))
}, () => {
  return gulp.src([
    '_temp/xe-utils/**/*.html',
  ], { base: './_temp/' })
    .pipe(replace('</head>', `${hmScript}</head>`))
    .pipe(gulp.dest('docs'))
}))

gulp.task('copy_docs_index', gulp.series('copy_v3_index', () => {
  return gulp.src('_temp/**')
    .pipe(gulp.dest('docs'))
}, () => {
  return gulp.src([
    '_temp/xe-utils/**/*.html'
  ], { base: './_temp/' })
    .pipe(replace('</head>', `${hmScript}</head>`))
    .pipe(gulp.dest('docs'))
}))

const unicodeRE = /[^\x00-\xff]/g
const contentRE = /(?<!-)content\s*:\s*([^;}]+)/g

gulp.task('build_css_unicode', () => {
  return gulp.src([
    '_temp/**/**.css'
  ])
    .pipe(replace(contentRE, (u) => {
      return u.replace(unicodeRE, (m) => {
        return '\\' + m.charCodeAt(0).toString(16)
      })
    }))
    .pipe(gulp.dest('docs'))
})

gulp.task('build_latest_docs', () => {
  return gulp.src([
    'docs/xe-utils/*.html',
    'docs/xe-utils/*.ico',
    'docs/xe-utils/*.png',
    'docs/xe-utils/*.txt'
  ])
    .pipe(gulp.dest('docs'))
})

gulp.task('build_v3_docs', gulp.series('clear_docs_temp', 'copy_v3_docs', 'build_css_unicode', () => {
  return del([
    '_temp'
  ], { force: true })
}))

gulp.task('build_all_docs', gulp.series('clear_docs_temp', 'copy_docs_index', 'build_css_unicode', 'build_latest_docs', () => {
  return del([
    '_temp'
  ], { force: true })
}))

gulp.task('build_v3_zip', () => {
  return gulp.src([
    'docs/xe-utils/**'
  ], { base: './docs/' })
    .pipe(zip('docs_util3.zip'))
    .pipe(gulp.dest('./'))
})

gulp.task('build_all_zip', () => {
  return gulp.src('docs/**')
    .pipe(zip('util_docs.zip'))
    .pipe(gulp.dest('./'))
})
