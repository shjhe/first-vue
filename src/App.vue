<style lang="less" rel="stylessheet/less">
  @import 'common/less/mixin.less';
  .tab{
    display:flex;
    width:100%;
    height:40px;
    line-height:40px;
    .border-1px(rgba(7,17,27,0.1));
    .tab-item{
        flex:1;
        text-align:center;
        &>a{
          display:block;
          font-size:14px;
          color:rgb(77,85,93);
          &.active{
            color:rgb(240,20,20);
          }
        }
    }
  }
</style>
<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item border-1px">
        <a v-link="{ path: '/goods' }">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{ path: '/ratings' }">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{ path: '/seller' }">商家</a>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
</div>
</template>
<script>
import { urlParse } from 'common/js/utils';
import header from './components/header/header';
const ERR_OK = 0;
export default {
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam && queryParam.id;
        })()
      }
    };
  },
  created() {
    this.$http.get('/api/seller?id=' + this.seller.id).then(
      (req) => {
        req = req.body;
        if (req.errno === ERR_OK) {
          // this.seller = req.data;
          // 给对象扩展属性的方法  p1=返回对象 p2 p3为传入
          this.seller = Object.assign({}, this.seller, req.data);
        }
      }
    );
  },
  components: {
    'v-header': header
  }
};
</script>
