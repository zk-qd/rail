// 提示工具
// 基于jq
var zkTip = {

    initHtml: function (type) {
        var arr = [
            "success",
            "info",
            "warn",
            "error",
        ];

        var parent = document.createElement("div");
        parent.className = "zkTip";
        var child = document.createElement("div");
        var cross = document.createElement("div");
        cross.className = "cross";
        switch (type) {
            case 1 || "success":
                child.className = "success";
                break;
            case 2 || "info":
                child.className = "info";
                break;
            case 3 || "warn":
                child.className = "warn";
                break;
            case 4 || "error":
                child.className = "error";
                break;
            default:
                child.className = "success";
                break;
        };
        parent.appendChild(child);
        parent.appendChild(cross);
        document.body.appendChild(parent);
        return parent;
    },
    initCss: function (type, shadow) {
        $(".zkTip").css({
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 999,
            textAlign: "center",
            borderRadius: "3px",
            boxShadow: "0 -2px 5px #C1C1C1,1px -1px 5px #C1C1C1,0 0 0 transparent,-1px -1px 5px #C1C1C1",
        });
        // 控制不设置阴影
        if (shadow) {
            $(".zkTip").css({
                boxShadow: "none",
                zIndex: "999",
            })
        }
        $(".cross").css({
            position: "absolute",
            right: "0.5vh",
            top: "-0.2vh",
            fontSize: "2vh",
            color: "white",
            fontWeight: 100,
            cursor: "pointer",
            zIndex: 999,
            opacity: "0.5",
        }).text("x").hover(function () {
            $(this).css("opacity", "1");
        }, function () {
            $(this).css("opacity", "0.5");
        });

        var fontize = "20px";
        var padding = "6px 30px";
        var borderRadius = "4px";
        var color = "#FFFFFF";

        switch (type) {

            case 1 || "success":
                $(".success").css({
                    fontSize: fontize,
                    color: color,
                    padding: padding,
                    borderRadius: borderRadius,
                    backgroundColor: "#5BB856",
                });
                break;
            case 2 || "info":
                $(".info").css({
                    fontSize: fontize,
                    color: color,
                    padding: padding,
                    borderRadius: borderRadius,
                    background: "#5CC0DE",
                });
                break;
            case 3 || "warn":
                $(".warn").css({
                    fontSize: fontize,
                    color: color,
                    padding: padding,
                    borderRadius: borderRadius,
                    background: "#F0AD55",
                });
                break;
            case 4 || "error":
                $(".error").css({
                    fontSize: fontize,
                    color: color,
                    padding: padding,
                    borderRadius: borderRadius,
                    background: "#D9534F",
                });
                break;
            default:
                $(".expand").css({
                    // fontSize: "2vh",
                    // color: "#FFFFFF",
                    // padding: "0.8vh 3vh",
                    // borderRadius: "0.5vh",
                    // background: "#E5E5E5",
                    fontSize: fontize,
                    color: color,
                    padding: padding,
                    borderRadius: borderRadius,
                    background: "#E5E5E5",
                });
                break;
        };
    },
    initJs: function (parent) {
        parent.children(".cross").on("click", function () {
            zkTip.remove(parent);
        });
    },
    // 显示消息  消息类型  消息框位置默认50  是否取消阴影  消息框显示的速度默认500 消息框等待时间默认3000 
    tip: function (msg, type, top, shadow, speed, delay) {
        type = type || 2;
        top = top || "70";
        // shadow为true取消设置阴影
        shadow = true;
        switch (type) {
            case 1 || "success":
                var parent = $(this.initHtml(type));
                this.initCss(type, shadow);
                this.initJs(parent);
                parent.css({
                    top: -50,
                    opacity: 0,
                })
                parent.children(".success").text(msg || "成功提示");
                this.run(parent, top, speed, delay);
                break;
            case 2 || "info":
                var parent = $(this.initHtml(type));
                this.initCss(type, shadow);
                this.initJs(parent);
                parent.css({
                    top: -50,
                    opacity: 0,
                })
                parent.children(".info").text(msg || "信息提醒");
                this.run(parent, top, speed, delay);
                break;
            case 3 || "warn":
                var parent = $(this.initHtml(type));
                this.initCss(type, shadow);
                this.initJs(parent);
                parent.css({
                    top: -50,
                    opacity: 0,
                })
                parent.children(".warn").text(msg || "警告提示");
                this.run(parent, top, speed, delay);
                break;
            case 4 || "error":
                var parent = $(this.initHtml(type));
                this.initCss(type, shadow);
                this.initJs(parent);
                parent.css({
                    top: -50,
                    opacity: 0,
                })
                parent.children(".error").text(msg || "失败提示");
                this.run(parent, top, speed, delay);
                break;
            default:
                alert("待续");
                break;
        }
    },
    tips: function (config) {
        // 消息内容
        var msg = config.msg;
        // 消息类型
        var type = config.type ? config.type : 2;
        // 显示位置
        var top = config.top ? config.top : "70";
        // 是否有阴影
        var shadow = config.shadow;
        // 出现速度
        var speed = config.speed;
        // 暂停时间
        var delay = config.delay;
        // 显示层级
        var zIndex = config.zIndex ? config.zIndex : 999;

        // shadow为true取消设置阴影
        shadow = true;
        switch (type) {
            case 1 || "success":
                var parent = $(this.initHtml(type));
                this.initCss(type, shadow);
                this.initJs(parent);
                parent.css({
                    top: -50,
                    opacity: 0,
                    zIndex: zIndex,
                })
                parent.children(".success").text(msg || "成功提示");
                this.run(parent, top, speed, delay);
                break;
            case 2 || "info":
                var parent = $(this.initHtml(type));
                this.initCss(type, shadow);
                this.initJs(parent);
                parent.css({
                    top: -50,
                    opacity: 0,
                    zIndex: zIndex,
                })
                parent.children(".info").text(msg || "信息提醒");
                this.run(parent, top, speed, delay);
                break;
            case 3 || "warn":
                var parent = $(this.initHtml(type));
                this.initCss(type, shadow);
                this.initJs(parent);
                parent.css({
                    top: -50,
                    opacity: 0,
                    zIndex: zIndex,
                })
                parent.children(".warn").text(msg || "警告提示");
                this.run(parent, top, speed, delay);
                break;
            case 4 || "error":
                var parent = $(this.initHtml(type));
                this.initCss(type, shadow);
                this.initJs(parent);
                parent.css({
                    top: -50,
                    opacity: 0,
                    zIndex: zIndex,
                })
                parent.children(".error").text(msg || "失败提示");
                this.run(parent, top, speed, delay);
                break;
            default:
                alert("待续");
                break;
        }
    },

    // 运行方法
    run: function (parent, top, speed, delay) {
        speed = speed || 500;
        delay = delay || 3000;
        parent.animate({
            top: top,
            opacity: 1,
        }, speed, "linear", function () {
            $(this).delay(delay).animate({
                opacity: 0,
            }, 1000, "linear", function () {
                zkTip.remove($(this));
            })
        });
    },
    // 删除方法
    remove: function (parent) {
        parent.remove();
    },

};
