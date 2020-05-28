<template>
	<div id="main">
	    <mavon-editor v-model="value"  :defaultOpen="preview" :placeholder ="placeholder" :navigation ="navigation"/>
	</div>

</template>
<script type="text/javascript">
	import {mavonEditor} from "mavon-editor";
	import "mavon-editor/dist/css/index.css";
	export default {
		name : 'CompoOne',
		components: { mavonEditor },
		data (){
			return {
				value : '',
				editable: false,
				navigation : true,
				preview: "preview",
				placeholder :"请留下你的印记"
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
		}
	}
</script>
