import bytesize from 'bytesize';

bytesize.gzipSize(__dirname + '/frontexpress-path-to-regexp.min.js', true, (err, size) => {
    console.log(`frontexpress-path-to-regexp size: ${size}(min+gzip)`);
});
