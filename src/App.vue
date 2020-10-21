<template>
  <div class="sub-project-vue-demo">
    <div id="app" class="dstor-app-wrap">
      <router-view />
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "App",
  mounted() {
    // 接收用户选择的租户和项目信息 监听项目切换事件
    window.addEventListener(
      "message",
      async (event) => {
        const { data } = event;
        if (_.isPlainObject(data) && data.type === "tenantProject") {
          console.log("监听项目切换====>", data);
        }
      },
      false
    );

    // 监听当前语言
    window.addEventListener(
      "message",
      (event) => {
        const { data } = event;
        if (_.isPlainObject(data) && data.type === "language") {
          console.log("监听当前语言====>", data);
        }
      },
      false
    );

    //监听当前权限
    window.addEventListener(
      "message",
      (event) => {
        const { data } = event;
        if (_.isPlainObject(data) && data.type === "permissionPoint") {
          console.log("监听当前权限====>", data);
        }
      },
      false
    );

    // 是否显示租户、项目选择器
    window.postMessage(
      {
        type: "tenantProjectVisible",
        value: true,
      },
      window.origin
    );
  },
  methods: {},
};
</script>

<style lang="scss">
body {
  font-size: 16px;
}
#ecmc-layout-container {
  height: 100%;
}
.el-form--label-top.reset-label-padding {
  .el-form-item__label {
    padding: 0;
  }
}
.el-dialog.reset-body-padding {
  .el-dialog__body {
    padding: 0 20px;
  }
}

.dialog-footer {
  display: flex;
  .el-button {
    flex: 1;
  }
}

.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  display: inline-block;
}

.link-style {
  color: #409eff;
  cursor: pointer;
}

.link-txt {
  cursor: pointer;
  &:hover {
    color: #409eff;
  }
}

[class~="grid"] {
  box-sizing: border-box;
  display: flex;
}
[class*="grid-"] {
  box-sizing: border-box;
  display: flex;

  &[class*="-column"] {
    flex-direction: column;
  }

  &[class*="-column-reverse"] {
    flex-direction: column-reverse;
  }

  &[class*="-reverse"] {
    flex-direction: row-reverse;
  }

  &[class*="-wrap"] {
    flex-wrap: wrap;
  }

  &[class*="-wrapReverse"] {
    flex-wrap: wrap-reverse;
  }

  &[class*="-xEnd"] {
    justify-content: flex-end;
  }

  &[class*="-xCenter"] {
    justify-content: center;
  }

  &[class*="-xBetween"] {
    justify-content: space-between;
  }

  &[class*="-xAround"] {
    justify-content: space-around;
  }

  &[class*="-yStart"] {
    align-content: flex-start;
  }

  &[class*="-yEnd"] {
    align-content: flex-end;
  }

  &[class*="-yCenter"] {
    align-content: center;
  }

  &[class*="-yBetween"] {
    align-content: space-between;
  }

  &[class*="-yAround"] {
    align-content: space-around;
  }

  &[class*="-iStart"] {
    align-items: flex-start;
  }

  &[class*="-iEnd"] {
    align-items: flex-end;
  }

  &[class*="-iCenter"] {
    align-items: center;
  }

  &[class*="-iBaseline"] {
    align-items: baseline;
  }

  &[class~="col"],
  &[class^="col-"] {
    margin: 0;
    padding: 0;
  }
}

[class~="col"] {
  box-sizing: border-box;
}
[class*="col-"] {
  box-sizing: border-box;
  &[class*="-first"] {
    order: -1;
  }

  &[class*="-last"] {
    order: 1;
  }

  &[class*="-start"] {
    align-self: flex-start;
  }

  &[class*="-center"] {
    align-self: center;
  }

  &[class*="-end"] {
    align-self: flex-end;
  }

  &[class*="-baseline"] {
    align-self: baseline;
  }

  &[class*="-stretch"] {
    align-self: stretch;
  }

  &[class*="-right"] {
    margin-left: auto;
  }

  &[class*="-left"] {
    margin-right: auto;
  }

  &[class*="-none"] {
    flex: none;
  }

  &[class*="-auto"] {
    flex: auto;
  }

  &[class*="-force"] {
    flex: 1;
  }
}
.dstor-app-wrap {
  .cluster-list__action,
  .pool-list__action,
  .s3user-bucket-list__action,
  .server-list__action {
    margin-bottom: 15px;
    display: flex;
    button {
      margin-right: 5px;
    }
    .pool-list__action-right,
    .server-list__action-right {
      margin-left: 0;
    }
    .el-range-editor--small.el-input__inner {
      height: 33px;
    }
    &.operatin-log-action {
      button {
        margin-right: 0;
      }
    }
  }
  .el-table {
    margin-bottom: 20px;
  }
  .g-index-header {
    margin-bottom: 20px;
  }
  .server-list__action {
    margin-bottom: 20px;
  }
  .el-pagination {
    text-align: right;
    font-weight: normal;
  }
  .custom-table-wrap {
    position: relative;
    min-width: fit-content;
    width: auto;
    padding: 15px;
    border: 1px solid #e8e8e8;
    border-radius: 2px;
    .el-pagination__sizes {
      float: right;
      margin: 0;
    }
    .el-pager {
      .number {
        border: 1px solid rgba(0, 0, 0, 0);
        width: 28px;
        padding: 0;
        min-width: 0;
        line-height: 26px;
        &.active {
          border: 1px solid #3e78e6;
        }
      }
    }
  }
}
</style>
