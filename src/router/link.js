function categoryLink(category) {
    if (category.Name == '我的视频' || category.Name == '我收藏的视频' || category.Name == '热门视频') {
        return {
            name: 'channel1',
            params: {
                category: category.Name,
            },
        };
    } else if (category.Name == '我收藏的作者' || category.Name == '热门作者') {
        return {
            name: 'channel2',
            params: {
                category: category.Name,
            },
        };
    } else if (category.Name == '上传视频') {
        return {
            name: 'channel3',
            params: {
                category: category.Name,
            },
        }
    }
}

function videoLink(video) {
    return {
        name: 'play',
        params: {
            videoid: video.id,
            video: video.name,
            video: video.author,
            url: video.url,
        }
    }
}
export { categoryLink, videoLink };