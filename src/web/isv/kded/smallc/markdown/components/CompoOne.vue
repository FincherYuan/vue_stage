<template>
	<div id="main" style="height: 600px"> <!-- v-html="compodata.render" -->
	    <mavon-editor ref=md v-model="compodata.value" :defaultOpen="compodata.configItems.defaultOpen" :placeholder ="placeholder" :navigation ="navigation" @save="save" @change="change" @imgAdd="$imgAdd" :subfield ="compodata.configItems.subfield" :toolbarsFlag="compodata.configItems.toolbarsFlag"  style="height: 600px"/>
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
				toolbarsFlag : false // 设置工具栏不显示
				//toolbars :{
					//navigation: true, // 导航目录
			        /* 2.1.8 */
			        /*alignleft: true, // 左对齐
			        aligncenter: true, // 居中
			        alignright: true, // 右对齐*/
			        /* 2.2.1 */
			        /*subfield: true, // 单双栏模式
			        preview: true, // 预览*/
				//}
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
