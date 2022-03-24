/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-12-13 10:13:17
 * @FilePath: /vue-shelf/src/components/go/init.js
 */
import go from '@/assets/plugins/go';

export function defineFigureGenerator(shape, w, h) {
  var p1 = 10;
  if (shape !== null) {
    var param1 = shape.parameter1;
    if (!isNaN(param1) && param1 >= 0) p1 = param1; // can't be negative or NaN
  }
  p1 = Math.min(p1, w / 2);
  p1 = Math.min(p1, h / 2);
  var geo = new go.Geometry();
  geo.add(
    new go.PathFigure(0, p1)
      .add(new go.PathSegment(go.PathSegment.Arc, 180, 90, p1, p1, p1, p1))
      .add(new go.PathSegment(go.PathSegment.Line, w - p1, 0))
      .add(new go.PathSegment(go.PathSegment.Arc, 270, 90, w - p1, p1, p1, p1))
      .add(new go.PathSegment(go.PathSegment.Arc, 0, 90, w - p1, h - p1, p1, p1))
      .add(new go.PathSegment(go.PathSegment.Arc, 90, 90, p1, h - p1, p1, p1).close())
  );
  // don't intersect with two top corners when used in an "Auto" Panel
  geo.spot1 = new go.Spot(0, 0, 0.3 * p1, 0.3 * p1);
  geo.spot2 = new go.Spot(1, 1, -0.3 * p1, 0);
  return geo;
};

export const chartDiagram = {
  scale: 1.0,
  // initialDocumentSpot: go.Spot.Center,
  // initialViewportSpot: go.Spot.Center,
  // allowZoom: !1,
  // allowLink: !0,
  'draggingTool.dragsLink': false, //拖动线
  // initialContentAlignment: go.Spot.TopCenter, // 居中显示
  // "undoManager.isEnabled": true, // 支持 Ctrl-Z 和 Ctrl-Y 操作
  'toolManager.hoverDelay': 100, //tooltip提示显示延时
  // "toolManager.toolTipDuration": 10000, //tooltip持续显示时间
  // isReadOnly:true,//只读
  // allowZoom: true,//画布是否可以缩放
  'grid.visible': false, //显示网格
  allowMove: true, //允许拖动
  // allowDragOut:true,
  allowDelete: true,
  'animationManager.duration': 100, //画布刷新的加载速度
  //允许使用delete键删除模块
  'commandHandler.deletesTree': false,
  // 复制
  allowCopy: false,
  // "animationManager.initialAnimationStyle":go.Animation.EaseOutExpo,
  // "animationManager.initialAnimationStyle": go.Animation.EaseInOutQuad,
  'animationManager.initialAnimationStyle': go.AnimationManager.None,
  // "animationManager.initialAnimationStyle":go.AnimationManager.AnimateLocations,
  hasHorizontalScrollbar: false, //去除水平滚动条
  hasVerticalScrollbar: false, //去除竖直滚动条
  // "canStart":false,
  // allowClipboard: true,

  ChangedSelection: '',
  // "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom, //有鼠标滚轮事件放大和缩小，而不是向上和向下滚动
  // layout: $(go.TreeLayout, {
  //     treeStyle: go.TreeLayout.LayerUniform,
  //     alignment: go.TreeLayout.AlignmentCenterChildren,
  //     angle: 90,
  //     layerSpacing: 80,
  //     alternateAngle: 0,
  //     alternateNodeIndent: 60,
  //     alternateNodeIndentPastParent: 1,
  //     alternateNodeSpacing: 60,
  //     alternateLayerSpacing: 60,
  //     alternateLayerSpacingParentOverlap: 1,
  //     alternatePortSpot: new go.Spot(.001,1,20,0),
  //     alternateChildPortSpot: go.Spot.Top
  // }),
  // layout:changedSelection
  //       $(go.TreeLayout,
  //             {angle: 90, arrangement: go.TreeLayout.ArrangementHorizontal}),
  // layout:
  //       $(go.TreeLayout,
  //             {angle: 90, arrangement: go.TreeLayout.ArrangementFixedRoots}),
  // layout:
  //       $(go.TreeLayout,
  //             {	angle: 90,
  //                 compaction:  go.TreeLayout.LayerUniform}),
  // layout:
  //       $(go.TreeLayout,
  //             {	angle: 90,
  //                 layerSpacing:80,
  //                 isOngoing:false,
  //                 compaction: go.TreeLayout.CompactionNone}),
  layout: '',
  // "draggingTool.dragsTree": true,
};

export const linkTemplate = function (name, linkType, dashed, delLinkCom) {
  const $ = name;
  return $(
    go.Link,
    {
      corner: 15,
      toShortLength: 4,
      // curve: go.Link.JumpOver,
      toEndSegmentLength: 15,
      fromEndSegmentLength: 10,
      cursor: 'pointer',
    },
    new go.Binding('fromSpot', 'fromSpot', go.Spot.parse),
    new go.Binding('toSpot', 'toSpot', go.Spot.parse),
    new go.Binding('routing', 'routing'),
    {
      selectionAdornmentTemplate: $(
        go.Adornment,
        $(go.Shape, { isPanelMain: true, stroke: '#fff', strokeWidth: 3 }),
        $(go.Shape, { toArrow: 'Standard', fill: '#fff', stroke: null })
      ),
    },
    $(
      go.Shape,
      'RoundedRectangle',
      {
        fill: '#fff',
        stroke: '#fff',
      },
      new go.Binding('strokeDashArray', 'strokeDashArray'),
      new go.Binding('name', 'animation'),
      // #8445DE
      new go.Binding('stroke', 'isHighlighted', (h) => {
        return h ? '#fff' : '#555555';
      }).ofObject(),
      new go.Binding('strokeWidth', 'isHighlighted', (h) => {
        return h ? 3 : 2.5;
      }).ofObject()
    ),
    // this.selectModuleColor(),
    $(
      go.Shape,
      { toArrow: 'Standard', strokeWidth: 0 },
      new go.Binding('fill', 'isHighlighted', (h) => {
        return h ? '#fff' : '#555555';
      }).ofObject()
    ),
    {
      contextMenu: linkType(), // 右点击线
    },
    {
      click: (e, obj) => {
        dashed(e, obj)
      },
    },
    {
      click: (e, t) => {
        let linkClose = t.part.findObject('linkClose');
        linkClose.opacity = 1;
      },
      mouseEnter: (e, t) => {
        let linkClose = t.part.findObject('linkClose');
        linkClose.opacity = 1;
      },
      mouseLeave: (e, t) => {
        let linkClose = t.part.findObject('linkClose');
        linkClose.opacity = 0;
      },
    }, // 线的悬浮离开展示删除图标
    $(
      go.Picture,
      {
        cursor: 'pointer',
        opacity: 0,
        name: 'linkClose',
        desiredSize: new go.Size(14, 14),
        click: (e, obj) => {
          delLinkCom(obj.part.data); // 删除连线
        },
      },
      {
        mouseEnter: (e, t) => {
          if (t.element != null) {
            t.source = this.imgx_h;
          }
        },
        mouseLeave: (e, t) => {
          if (t.element != null) {
            t.source = this.imgx_r;
          }
        },
      },
      new go.Binding('source', 'close')
    )
  )
}