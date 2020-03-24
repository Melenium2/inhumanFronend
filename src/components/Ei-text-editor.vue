<template>
  <div class="ei-text-editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
         <button
          class="menubar-button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <awesome-icon icon="bold"></awesome-icon>
        </button>
        <button
          class="menubar-button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <awesome-icon icon="italic"></awesome-icon>
        </button>
        <button
          class="menubar-button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <awesome-icon icon="strikethrough"></awesome-icon>
        </button>
        <button
          class="menubar-button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <awesome-icon icon="underline"></awesome-icon>
        </button>
        <button
          class="menubar-button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <awesome-icon icon="quote-right"></awesome-icon>
        </button>
        <button
          class="menubar-button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          <awesome-icon icon="heading"></awesome-icon>
        </button>
        <button
          class="menubar-button"
          @click="commands.horizontal_rule"
        >
          <awesome-icon icon="minus"></awesome-icon>
        </button>
        <button
          class="menubar-button"
          @click="commands.undo"
        >
          <awesome-icon icon="undo-alt"></awesome-icon>
        </button>

        <button
          class="menubar-button"
          @click="commands.redo"
        >
          <awesome-icon icon="redo-alt"></awesome-icon>
        </button>
      </div>
    </editor-menu-bar>
    <editor-content class="content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  Bold,
  Italic,
  Strike,
  Underline,
  Heading,
  HorizontalRule,
  History
} from 'tiptap-extensions'

export default {
  components: {
    EditorContent,
    EditorMenuBar,
  },
  data: () => ({
    focused: false,
    editor: null
  }),
  methods: {
    update(obj) {
      this.$emit('input', obj.getHTML())
    }
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new History(),
        new HorizontalRule(),
        new Blockquote(),
        new Bold(),
        new Italic(),
        new Strike(),
        new Underline(),
        new Heading({ levels: [2] }),
      ],
      onFocus: object => object.view.dom.parentNode.classList.add('content-focused'),
      onBlur: object => object.view.dom.parentNode.classList.remove('content-focused'),
      onUpdate: this.update
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>

<style lang='scss'>
@import '@/assets/scss/components/ei-text-editor.scss';
</style>