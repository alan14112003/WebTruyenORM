import ClearUploadFolderTask from './ClearUploadFolder.task'
import PublicChapterTask from './PublicChapter.task'

const initCron = () => {
  ClearUploadFolderTask.start()
  PublicChapterTask.start()
}

export default initCron
