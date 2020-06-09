<template>
	<div id="main" style="height: 100%"> <!-- v-html="compodata.render" -->
	    <mavon-editor ref=md v-model="compodata.value" :defaultOpen="compodata.configItems.defaultOpen" :placeholder ="placeholder" :navigation ="navigation" @save="save" @change="change" @imgAdd="$imgAdd" :subfield ="compodata.configItems.subfield" :toolbarsFlag="compodata.configItems.toolbarsFlag"  style="height: 1100px" :toolbars ="toolbars"/>
	</div>

</template>
<script type="text/javascript">
	import {mavonEditor} from "mavon-editor";
	import "mavon-editor/dist/css/index.css";
	export default {
		name : 'CompoOne',
		components: { mavonEditor },
		props : {
			compodata :{
				type : Object,
				default :{
					value : "标题一",
		            configItems : {
		              	toolbarsFlag : false,
		              	defaultOpen : "edit",
		              	subfield : true
		            }
				}
			}
		}
		,
		data (){
			return {
				value : '',
				editable: false,
				navigation : true,
				preview: "edit",
				placeholder :"请留下你的印记",
				subfield : false, // 设置单双栏
				toolbarsFlag : false ,// 设置工具栏不显示
				toolbars :{
					bold: true, // 粗体
				    italic: true, // 斜体
				    header: true, // 标题
				    underline: true, // 下划线
				    strikethrough: true, // 中划线
				    mark: true, // 标记
				    superscript: true, // 上角标
				    subscript: true, // 下角标
				    quote: true, // 引用
				    ol: true, // 有序列表
				    ul: true, // 无序列表
				    link: true, // 链接
				    imagelink: true, // 图片链接
				    code: true, // code
				    table: true, // 表格
				   	fullscreen: true, // 全屏编辑
				    readmodel: true, // 沉浸式阅读
				    htmlcode: true, // 展示html源码
				    help: true, // 帮助
				      /* 1.3.5 */
				    undo: true, // 上一步
				    redo: true, // 下一步
				    trash: true, // 清空
				    //save: false, // 保存（触发events中的save事件）
				      /* 1.4.2 */
				    navigation: true, // 导航目录
				      /* 2.1.8 */
				    alignleft: true, // 左对齐
				    aligncenter: true, // 居中
				    alignright: true, // 右对齐
				      /* 2.2.1 */
				    subfield: true, // 单双栏模式
				    preview: true, // 预览
				}
			}
		},
		mounted () {
			console.log("CompoOne update --" + this.compodata)

		},
		methods: {
			save(value,render){
				var data = new Object();
				data.value = value;
				data.render = render;
				this.$emit("childInvoke","save",data);
			},
			change(value,render){
				var data = new Object();
				data.value = value;
				data.render = render;
				
				this.$emit("childInvoke","change",data,val => {
					//$vm.$img2Url(pos, url);

					//console.log(this.compodata.tempImgUrl);// 回调函数
				});
			},
			$imgAdd(pos, $file){
				const _self = this;
				_self.parentInvokeMethod(pos, $file);

			},

			setImgUrl(pos,url){
				this.$refs.md.$img2Url(pos, url);
			},

			async parentInvokeMethod(pos, $file) {
				const _self = this;
				var data = new Object();
				data.file = $file;
				data.imgPos = pos;
				await this.$emit("childInvoke","upload",data,val => {
					//_self.$refs.md.$img2Url(pos, val.tempImgUrl);
				});

			}
		}
	}
</script>
