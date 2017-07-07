import _ from 'lodash';
(()=>{
  const UTF_8_BOM = '%EF%BB%BF';

  const result = [];
  const dom = document.getElementById('stream-items-id');
  _.forEach(dom.getElementsByClassName('js-stream-item'), li => {
    const name = li.getElementsByClassName('fullname')[0].textContent;
    const link = li.getElementsByClassName('tweet-timestamp')[0].getAttribute('href');
    const text = li.getElementsByClassName('tweet-text')[0].textContent;
    const re_tweet = li.querySelector('.js-actionRetweet .ProfileTweet-actionCountForPresentation').textContent || 0;
    const fav  = li.getElementsByClassName('.js-actionFavorite .ProfileTweet-actionCountForPresentation').textContent || 0;
    const isRT = !li.getElementsByClassName('QuoteTweet')[0] ? 'いいえ' : 'はい';
    result.push(
      `"${name}","https://twitter.com${link}","${text}","${re_tweet}","${fav}", "${isRT}"`
    )
  })
  const csv = result.join('\n');
  window.location.href = 'data:text/csv;charset=utf-8,' + UTF_8_BOM + encodeURIComponent(csv);
})();
