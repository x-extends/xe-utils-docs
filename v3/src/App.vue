<template>
  <RouterView />
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
#app {
  height: 100%;
  overflow: auto;
  background: #fff;
}
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  color: #000;
  font-size: 14px;
  overflow: hidden;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
  background: #fff;
  * {
    box-sizing: border-box;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .link {
    color: #409eff;
    text-decoration: none;
  }
  p {
    margin: 14px 0;
    font-size: 14px;
  }
}
.keyword-lighten {
  color: #000;
  background-color: #FFFF00;
}
.page-container {
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .page-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 50px;
    border-bottom: 1px solid #ecf0f7;
    .header-left,
    .header-right {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-shrink: 0;
    }
    .header-middle {
      flex-grow: 1;
    }
  }
  .header-left {
    padding: 0 16px;
    .logo {
      text-decoration: none;
      color: var(--vxe-ui-docs-font-color);
      padding: 0 0.4em;
      font-weight: 700;
      font-size: 18px;
      padding: 0 8px;
      cursor: pointer;
      img {
        height: 20px;
        margin-right: 16px;
      }
      img,
      span {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  .page-body {
    flex-grow: 1;
    overflow: auto;
    display: flex;
    flex-direction: row;
  }
  .aside {
    display: flex;
    flex-direction: column;
    width: 240px;
    flex-shrink: 0;
    overflow: auto;
    border-right: 1px solid #dcdfe6;
    padding: 0 0 30px 0;
    .header {
      flex-shrink: 0;
      text-align: center;
      width: 220px;
      background-color: #fff;
      .search-wrapper {
        padding: 10px 0;
        .search-input {
          width: 60%;
          min-width: 120px;
          max-width: 200px;
          height: 26px;
          border: 1px solid #dcdfe6;
          border-radius: 4px;
          padding-left: 10px;
        }
      }
    }
    .menu-item {
      padding-left: 15px;
      &.active {
        border-right: 4px solid var(--vxe-ui-docs-primary-color);
      }
      .menu-link {
        line-height: 30px;
        font-weight: 700;
        font-size: 16px;
        cursor: pointer;
      }
      .child-menu {
        .menu-link {
          line-height: 22px;
          font-size: 14px;
          font-weight: inherit;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  .body {
    flex-grow: 1;
    overflow: auto;
    padding-right: 300px;
    .body-inner {
      max-width: 1000px;
      min-width: 600px;
      margin: 0 auto;
      padding: 0 16px 0 24px;
    }
    .api-item {
      .title {
        font-weight: 700;
        font-size: 16px;
      }
      .param-table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 600px;
        text-align: center;
        border-left: 1px solid #dcdfe6;
        border-top: 1px solid #dcdfe6;
        tr {
          &:first-child {
            background-color: #F6F8FA;
          }
          &:hover {
            background-color: #F6F8FA;
          }
        }
        td {
          padding: 4px ;
          border-right: 1px solid #dcdfe6;
          border-bottom: 1px solid #dcdfe6;
        }
      }
    }
  }
}
</style>
