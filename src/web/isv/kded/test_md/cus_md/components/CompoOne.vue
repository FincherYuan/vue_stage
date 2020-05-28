<template>
	<div id="main">
	    <mavon-editor v-model="value"/>
	</div>

</template>
<script type="text/javascript">
	export default {
		name : 'CompoOne',
		data (){
			return {
				value : '# 标题一 '
				+' # 标题二',
				editable: true,
				navigation : true,
				preview: true
			}
		}
	}
</script>
