// 围栏
window.railWin = function () {
    function railWin() {
        // 状态
        this.state;
        // 提交方法
        this.success;
        // 删除方法
        // this.delFn;

        // 多边形
        this.polygon;
        // 多边形编辑器
        this.polygonEditor;

        // 鼠标工具
        this.mouseTool;
        this.map;

        // 地图成功标识
        this.mapSuccess;

        // 编辑状态
        this.editState;
        this.html().bind();
    };
    railWin.prototype = {
        construct: railWin,
        // 添加
        initAdd: function (config) {
            this.config = config;
            this.success = this.config.success;
            this.state = "add";
            this.open(() => {
                // 使用工具类
                this.createMouseTool();
            })
            setTimeout(() => {
                this.render();
            });
        },
        // 编辑
        initEdit: function (config) {
            this.config = config;
            // this.delFn = this.config.delFn;
            this.success = this.config.success;
            this.state = "edit";
            this.open(() => {
                // 创建鼠标工具
                this.createMouseTool();
                // 显示区域
                this.showPolygon();
                // 创建编辑工具
                this.createPolygonEdit();
            });
            setTimeout(() => {
                this.render();
            });
        },
        // 查看
        initCheck: function (config) {
            this.config = config;
            this.state = "check";
            this.open(() => {

            });
            setTimeout(() => {
                this.render();
            });
        },
        // 创建窗口
        html: function () {
            $(
                `
                <div id="railWin" class="animated">
                    <div class="content boxShadow">
                        <div class="headContent">
                            <span class="title">标题</span>
                            <div class="exit">关闭</div>
                        </div>
                        <div class="info">
                            <ul> 
                            <li><span>区域名称: </span><em><input type="text" name="areaName" class="form-focus" placeholder="请输入区域名称"/></em></li>
                            <li><span><button id="btn-save">保存</button></span><span><button id="btn-reset">重置</button></span></li>
                            </ul>
                        </div>
                        <div class="bodyContent">
                            <div id="railMap"></div>
                        </div>
                        <ul id ="edit" class="clearfix">
                        <li>
                            <button id="btn-begin">开始编辑</button>
                        </li>
                        <li>
                            <button id="btn-end">结束编辑</button>
                        </li>
                        </ul>
                        <div id="hint" class="boxShadow">鼠标在地图上点击绘制多边形区域，双击或右键结束绘制</div>
                    </div>
                  
                </div>
            `).appendTo("body");
            return this;
        },
        render: function () {
            const config = this.config;
            
            document.querySelector('#railWin').querySelector('.title').innerHTML = this.config.title;
            switch (this.state) {
                case "add":
                    $("#edit").css("display", "block");
                    $("#railWin .info").html(`
                    <ul> 
                    <li class='rail-text'><span>区域名称: </span><em><input type="text" name="areaName" class="form-focus" placeholder="请输入区域名称"/></em></li>
                    <li class='rail-button'><span><button id="btn-save">保存</button></span><span><button id="btn-reset">重置</button></span></li>
                    </ul>
                    `);
                    this.bind();
                    break;
                case "edit":
                    $("#edit").css("display", "block");
                    $("#railWin .info").html(`
                    <ul> 
                        <li class='rail-text'><span>区域名称: </span><em><input type="text" value="${config.areaName}" name="areaName" class="form-focus" placeholder="请输入区域名称"/></em></li>
                        <li class='rail-button'><span><button id="btn-save">保存</button></span><span><button id="btn-reset">重置</button></span></li>
                    </ul>
                    `);
                    this.bind();
                    break;
                case "check":
                    $("#railWin .info").html(`
                    <ul>
                    <li class='rail-text'><span>区域名称: </span><em><input type="text" value="${config.areaName}" readonly name="areaName" class="form-focus" placeholder="请输入区域名称"/></em></li>
                    </ul>
                    `);
                    $("#edit").css("display", "none");
                    this.bind();
                    this.showPolygon();
                    break;
            }

            return this;
        },

        // 打开窗口
        open: function (callback) {
            // 显示窗口
            $("#railWin").css("display", "block").removeClass("zoomOutUp").addClass("zoomInUp").css("backgroundColor", "#93929255");
            // 创建地图
            this.map = new AMap.Map("railMap", {
                viewMode: '2D',
                // 自定义地图的两个属性  
                // mapStyle: 'amap://styles/2e77546dafb78229c439e72882973302',
                features: ['bg', 'point', 'road', 'build'],
                zoom: 13,
            });
            this.complete(callback);
            return this;
        },
        // 地图绑定方法
        complete: function (callback) {
            this.map.on("complete", e => {
                this.mapSuccess = true;
                if (callback) {
                    callback();
                }
            });
            return this;
        },
        // 鼠标工具
        createMouseTool: function () {
            this.map.plugin(["AMap.MouseTool"], () => {
                this.mouseTool = new AMap.MouseTool(this.map)
                this.mouseTool.on('draw', e => {
                    this.polygon = e.obj;
                    this.map.setFitView(this.polygon);
                    this.mouseToolClose();
                }).polygon({
                    strokeColor: "#FF33FF",
                    strokeWeight: 6,
                    strokeOpacity: 0.2,
                    fillOpacity: 0.4,
                    fillColor: '#1791fc',
                    zIndex: 50,
                });
            });
        },
        // 关闭鼠标工具
        mouseToolClose: function () {
            this.mouseTool.close();
        },
        // 编辑工具
        createPolygonEdit: function () {
            this.map.plugin(["AMap.PolyEditor"], () => {
                this.polygonEditor = new AMap.PolyEditor(this.map, this.polygon);
                // 然后打开编辑器
                this.openPolygonEdit();
            });
        },
        // 打开编辑器
        openPolygonEdit: function () {
            this.editState = true;
            // 关闭鼠标工具
            this.mouseToolClose();
            if (!this.polygonEditor) {
                // 使用编辑工具
                this.createPolygonEdit();
                return;
            }
            // 然后打开编辑器
            this.polygonEditor.open();
        },
        // 关闭多边形编辑器
        closePolygonEdit: function () {
            if (!this.polygonEditor) {
                zkTip.tip("操作失败", 3)
                return;
            }
            this.editState = false;
            // 关闭编辑工具
            this.polygonEditor.close();
        },
        // 显示多边形
        showPolygon: function () {
            const config = this.config;
            // 得到经纬度画一个多边形
            var path = config.path;
            if (!(path && path.length)) return;

            this.polygon = new AMap.Polygon({
                map: this.map,
                path: path,
                strokeColor: "#FF33FF",
                strokeWeight: 6,
                strokeOpacity: 0.2,
                fillOpacity: 0.4,
                fillColor: '#1791fc',
                zIndex: 50,
            });
            this.map.setFitView(this.polygon);
            return this;
        },
        // 验证方法
        validate: function (callback) {
            if (!this.polygon) {
                zkTip.tip("请编辑区域", 3);
                return;
            }
            if (!$("#railWin .info [name = areaName ]").val()) {
                zkTip.tip("区域名称不能为空", 3);
                return;
            }
            callback();
        },
        // 获取所有数据
        getData: function () {
            return {
                path: convert(this.polygon.getPath()),
                areaName: $("#railWin .info [name = areaName]").val(),
            }
        },
        // 提交方法
        submit: function () {
            this.validate(() => {
                if (this.state == "add") {
                    this.success(this.getData());
                    this.close();
                } else if (this.state == "edit") {
                    this.success(this.getData());
                    this.close();
                }
            })
        },
        // 绑定事件方法
        bind: function () {
            var that = this;
            // 绑定点击事件 关闭地图
            $("#railWin").on("click", function (e) {
                // 销毁地图
                // 点击边上  不能关闭
                // $("#railWin .exit").trigger('click');
            });
            $("#railWin>.content").on("click", function (e) {
                return false;
            });
            $("#railWin .exit").on("click", function () {
                that.close();
                return false;
            });
            // 保存事件
            $("#railWin #btn-save ").on("click", (e) => {
                this.submit();
            });
            // 取消事件
            $("#railWin #btn-reset").on("click", (e) => {
                // 清除覆盖物
                this.reset();
            });
            // 开始编辑
            $("#railWin #btn-begin").on("click", (e) => {
                if (this.mapSuccess) {
                    if (!this.polygon) {
                        zkTip.tip("编辑失败", 3);
                        return;
                    }
                    zkTip.tip("请编辑区域", 1);
                    if (!this.editState) {
                        this.openPolygonEdit();
                    }
                };
            });
            // 结束编辑
            $("#railWin #btn-end").on("click", (e) => {
                if (this.mapSuccess) {
                    if (!this.polygon) {
                        zkTip.tip("操作失败", 3);
                        return;
                    }
                    if (this.editState) {
                        this.closePolygonEdit();
                    }
                }
            });
            return this;
        },
        // 继承
        extends: function (fn, alias) {
            let aliasName;
            if (alias) {
                aliasName = alias;
            } else {
                aliasName = fn;
            }
            this.aliasName = fn;
            return this;
        },
        end: function () {
            return this;
        },
        // 关闭窗口
        close: function () {
            // 关闭窗口
            var that = this;
            // 重置数据
            this.reset();
            // 销毁地图
            this.map.destroy();
            $("#railWin").css("backgroundColor", "transparent").fadeOut(600, function () {

            });
            return this;
        },
        reset: function () {
            // 结束编辑
            if (this.state != "check") {
                if (this.polygonEditor) {
                    if (this.editState) {
                        $("#btn-end").trigger("click");
                    }
                    this.polygonEditor = null;
                }
                this.createMouseTool();
            }
            // 清除多边形
            if (this.polygon) {
                this.polygon.setMap(null);
                this.polygon = null;
            }
            // 重置info数据
            $("#railWin .info input[name = areaName]").val(null);
        },
    }
    // [{},{}]转换成[[],[]]
    function convert(path) {
        var new_path = [];
        path.forEach((item, index, path) => {
            new_path[index] = [item.lng, item.lat];
        })
        return new_path;
    }
    return new railWin();
}();